import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const LedStates = ({ ledColor, odriveId, resetLedColors, onLedColorsReset }) => {
    const [ledColors, setLedColors] = useState({
        '11': 'darkgrey',
        '12': 'darkgrey',
        '13': 'darkgrey',
        '14': 'darkgrey',
    });

    useEffect(() => {
        if (resetLedColors) {
            // Loop through the ledColors state and set all LEDs to the default color
            setLedColors(prevLedColors => {
                const newLedColors = { ...prevLedColors };
                for (let key in newLedColors) {
                    newLedColors[key] = 'darkgrey';
                    console.log('Resetting:', key);
                }
                console.log('Resetting LED colors...');
                return newLedColors;
            });
        } else if (odriveId) {
            setLedColors(prevLedColors => ({ ...prevLedColors, [odriveId]: ledColor }));
        }
    }, [ledColor, odriveId, resetLedColors]);

    useEffect(() => {
        if (resetLedColors) {
            onLedColorsReset();
        }
    }, [resetLedColors, onLedColorsReset]);

    return (
        <>
            <View style={[styles.led, { backgroundColor: ledColors['11'] }]} />
            <View style={[styles.led, { backgroundColor: ledColors['12'] }]} />
            <View style={[styles.led, { backgroundColor: ledColors['13'] }]} />
            <View style={[styles.led, { backgroundColor: ledColors['14'] }]} />
        </>
    );
}

const styles = StyleSheet.create({
    led: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 30,
        marginTop: 5,
    },
});

export default LedStates;