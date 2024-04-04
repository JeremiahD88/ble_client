import React from 'react';
import { StyleSheet, Text } from 'react-native';

const SpeedSeg = ({ speed }) => {
   return <Text style={styles.speed}>{speed}</Text>
};

const styles = StyleSheet.create({
    speed: {
        fontSize: 80,
        fontWeight: 'bold',
        color: 'darkgrey',
        fontFamily: 'digital 7',
    },
});

export default SpeedSeg;