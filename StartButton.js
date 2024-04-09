import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { BleServices }  from './BleServices';

const StartButton = () => {
    const handlePress = () => {
        console.log('Starting...');
        BleServices.writeCharacteristic('0x01')
    };

    return (
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Run</Text>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#102020', //'#1a600f'
        padding: 12,
        borderRadius: 10,
        width: 100,
        borderColor: '#707070', //#707070
        borderWidth: 0.5,
        width: 120,
    },
    buttonText: {
        color: 'lightgrey', 
        textAlign: 'center',
        fontFamily: 'monospace',
    },
});

export default StartButton;