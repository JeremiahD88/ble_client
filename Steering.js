import React, { useState, useRef } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';

const Joystick = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const joystickRef = useRef(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

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

      // Calculate the distance from the center
      const distance = Math.sqrt(newX * newX + newY * newY);

      // Calculate the angle of the movement
      const angle = Math.atan2(newY, newX);

      // Limit the movement to the radius of the outer circle
      if (distance > 100) {
        newX = 100 * Math.cos(angle);
        newY = 100 * Math.sin(angle);
      }

      setX(newX);
      setY(newY);
      console.log(`Position: (${newX}, ${newY})`);
    },
    onPanResponderRelease: () => {
      console.log('Joystick released. Position reset to (0, 0)');
      setX(0);
      setY(0);
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
    backgroundColor: 'lightgray',
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