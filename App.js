import React from 'react';
import { View, StyleSheet } from 'react-native';
import LedStates from './LedStates'; // Adjust the path if necessary
import ConnectionButton from './ConnectionButton';
import IdleButton from './IdleButton';
import StartButton from './StartButton';
import ClearErrorButton from './ClearErrorButton';
import Steering from './Steering';


const App = () => {
    return (
        <View style={styles.container}>
            <View style={styles.leds}>
                <LedStates />
                </View>
            <View style={styles.connectionButton}>
                <ConnectionButton />
                </View>
            <View style={styles.idleButton}>
                <IdleButton />
                </View>
            <View style={styles.startButton}>
                <StartButton />
                </View>
            <View style={styles.clearErrorButton}>
                <ClearErrorButton />
                </View>
            <View style={styles.steering}>
                <Steering />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 30,
    },
    leds: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 40,
    },
    connectionButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    idleButton: {
        position: 'absolute',
        left: 250,
        top: 350,
    },
    startButton: {
        position: 'absolute',
        right: 250,
        top: 350,
    },
    clearErrorButton: {
        position: 'absolute',
        right: 143,
        top: 350,
    },
    steering: {
        flex: 1,
        position: 'absolute',
        left: 100,
        top: 500,
    },

});

export default App;