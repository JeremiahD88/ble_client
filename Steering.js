import React, { useState, useRef, useEffect } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';
import sendSteering from './sendSteering';

const Joystick = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const joystickRef = useRef(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const [mappedX, setTargetX] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = Math.abs(currentY - targetY);
      const deadzone = 10; // Set the size of the deadzone as needed
  
      if (difference > deadzone) {
        const direction = targetY > currentY ? 1 : -1;
        setCurrentY(prevY => {
          const newY = prevY + direction * 15;
          sendSteering(newY, mappedX); // Send the updated steering value
          //console.log('mappedX:', mappedX);
          return newY;
        });
      }
    }, 50);
  
    return () => clearInterval(interval);
  }, [currentY, targetY]);

  const mapRange = (value, in_min, in_max, out_min, out_max) => {
    return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      joystickRef.current.measure((fx, fy, width, height, px, py) => {
        setOffsetX(px + width / 2);
        setOffsetY(py + height / 2);
      });
    },
    onPanResponderMove: (event, gestureState) => {
      let newX = gestureState.moveX - offsetX;
      let newY = gestureState.moveY - offsetY;

      // Calculate the distance from the center to the touch point
      const distance = Math.sqrt(newX * newX + newY * newY);

      // If the distance is greater than the radius, adjust the newX and newY values
      if (distance > 150) {
        newX *= 150 / distance;
        newY *= 150 / distance;
      }

      // Map the X and Y values to the desired ranges
      const mappedX = Math.round(mapRange(newX, -150, 150, 0, 255));
      const mappedY = Math.round(mapRange(newY, -150, 150, 255, -255));
      setTargetY(mappedY);
      setTargetX(mappedX);
      // Keep the joystick moving in both X and Y directions
      setX(newX);
      setY(newY);
    },
    onPanResponderRelease: () => {
      console.log('Joystick released. Position reset to (0, 0)');
      setX(0);
      setY(0);
      setTargetY(0);
      setTargetX(127);
      sendSteering(0);
    },
  });

  return (
    <View ref={joystickRef} style={styles.pad}>
      <View 
        {...panResponder.panHandlers} 
        style={[styles.stick, {transform: [{translateX: x}, {translateY: y}]}]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pad: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'darkgrey', //#90b0b0
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  stick: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#000000',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default Joystick;