import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { BleServices }  from './BleServices';

const DisconnectButton = ({ handleDisconnect }) => {
    const handlePress = async () => {
        console.log('Disconnecting...');
        await BleServices.disconnectDevice();
        handleDisconnect();
        
    };

    return (
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Disconnect</Text>
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

export default DisconnectButton;
