import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

const LedStates = () => {
    const [ledColors, setLedColors] = useState(['red', 'red', 'red', 'red']); // Initial colors

    // TODO: Update ledColors based on incoming data

    return (
        <>
            {ledColors.map((color, index) => (
                <View key={index} style={[styles.led, { backgroundColor: color }]} />
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    led: {
        width: 30,
        height: 30,
        borderRadius: 20,
        margin: 30,
        marginTop: 5,
    },
});

export default LedStates;