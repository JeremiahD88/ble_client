import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const ClearErrorButton = () => {
    const handlePress = () => {
        console.log('Clearing errors...');
        // Add button logic here
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