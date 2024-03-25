import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const StartButton = () => {
    const handlePress = () => {
        console.log('Starting...');
        // Add button logic here
    };

    return (
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'green', 
        padding: 10,
        borderRadius: 10,
        width: 100,
    },
    buttonText: {
        color: 'white', 
        textAlign: 'center',
    },
});

export default StartButton;