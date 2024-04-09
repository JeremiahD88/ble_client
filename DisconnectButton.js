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
        backgroundColor: '#8b0000', 
        padding: 10,
        borderRadius: 10,
        borderColor: '#707070', //#707070
        borderWidth: 0.5,
        width: 115,
    },
    buttonText: {
        color: 'lightgrey', //#dddddd
        textAlign: 'center',
        fontFamily: 'monospace',
    },
});

export default DisconnectButton;
