import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const DirectionButtons = () => {
    const handlePress = (direction) => {
        console.log('Direction:', direction);
        // Add button logic here
    };

    return (
        <>
            <TouchableOpacity onPress={() => handlePress('up')}>
                <Text style={styles.arrow}>&#8593;</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('down')}>
                <Text style={styles.arrow}>&#8595;</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    arrow: {
        fontSize: 80,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default DirectionButtons;