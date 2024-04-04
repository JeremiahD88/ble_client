import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import  { BleServices }  from './BleServices';

const ConnectionButton = ({setIsDeviceConnected}) => {
    const handlePress = () => {
        console.log('Connecting...');
        BleServices.connectToDevice('THE BEAST', setIsDeviceConnected);
    };

    return (
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Connect</Text>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red', 
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white', 
        textAlign: 'center',
    },
});

export default ConnectionButton;
