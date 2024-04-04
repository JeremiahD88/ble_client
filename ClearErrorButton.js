import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { BleServices }  from './BleServices';

const ClearErrorButton = () => {
    const handlePress = () => {
        console.log('Clearing errors...');
        BleServices.writeCharacteristic('0x03')
    };

    return (
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red', 
        padding: 10,
        borderRadius: 10,
        width: 100,
    },
    buttonText: {
        color: 'white', 
        textAlign: 'center',
    },
});

export default ClearErrorButton;