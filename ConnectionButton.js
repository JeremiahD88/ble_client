import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import  { BleServices }  from './BleServices';
import { useState } from 'react';

const ConnectionButton = ({setIsDeviceConnected}) => {
    const [buttonColor, setButtonColor] = useState('#8b0000'); 

    const handlePress = async () => {
        console.log('Connecting...');
        try {
            await BleServices.connectToDevice('THE BEAST', () => {
                setIsDeviceConnected(true);
                setButtonColor('#104020');
            }, () => setButtonColor('#8b0000'));
        } catch (error) {
            console.log('Error connecting:', error);
            setButtonColor('#8b0000');
        }
    };

    return (
        <TouchableOpacity style={{...styles.button, backgroundColor: buttonColor}} onPress={handlePress}>
            <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#8b0000', 
        padding: 10,
        borderRadius: 10,
        borderColor: '#707070',
        borderWidth: 0.5,
        width: 100,
    },
    buttonText: {
        color: 'lightgrey', 
        textAlign: 'center',
        fontFamily: 'monospace',
    },
});

export default ConnectionButton;
