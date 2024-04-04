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
          sendSteering(newY); // Send the updated steering value
          console.log('mappedX:', mappedX);
          return newY;
        });
      }
    }, 100);
  
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
      if (distance > 100) {
        newX *= 100 / distance;
        newY *= 100 / distance;
      }

      // Map the X and Y values to the desired ranges
      const mappedX = Math.round(mapRange(newX, -100, 100, 0, 255));
      const mappedY = Math.round(mapRange(newY, -100, 100, 255, -255));
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
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'darkgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stick: {
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: 'black',
  },
});

export default Joystick;