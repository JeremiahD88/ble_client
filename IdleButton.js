import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { BleServices }  from './BleServices';

const IdleButton = () => {
    const handlePress = () => {
        console.log('Idle...');
        BleServices.writeCharacteristic('0x00')
    };

    return (
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#10105f', //#1400a0
        padding: 12,
        borderRadius: 10,
        borderColor: '#707070', //'#707070'
        borderWidth: 0.5,
        width: 120,
    },
    buttonText: {
        color: 'lightgrey', 
        textAlign: 'center',
        fontFamily: 'monospace',
    },
});

export default IdleButton;