import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const IdleButton = () => {
    const handlePress = () => {
        console.log('Idle...');
        // Add button logic here
    };

    return (
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Idle</Text>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue', 
        padding: 10,
        borderRadius: 10,
        width: 100,
    },
    buttonText: {
        color: 'white', 
        textAlign: 'center',
    },
});

export default IdleButton;