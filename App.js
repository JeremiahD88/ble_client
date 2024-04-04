import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import LedStates from './LedStates'; // Adjust the path if necessary
import ConnectionButton from './ConnectionButton';
import IdleButton from './IdleButton';
import StartButton from './StartButton';
import ClearErrorButton from './ClearErrorButton';
import DisconnectButton from './DisconnectButton';
import TorqueSlider from './TorqueSlider';
import OdriveInfo from './OdriveInfo';
import { BleServices } from './BleServices';
import SpeedSeg from './SpeedSeg';
import Steering from './Steering';

const App = () => {
    const [odriveInfo, setOdriveInfo] = useState({color: 'lightgrey', id: '11'}); // Default odriveId
    const [isDeviceConnected, setIsDeviceConnected] = useState(false);
    const [resetLedColors, setResetLedColors] = useState(false);
    const [odriveSpeed, setOdriveSpeed] = useState(0);

    const handleLedColorsReset = () => {
        setResetLedColors(false);
    };

    const handleDisconnect = () => {
        setIsDeviceConnected(false);
        setResetLedColors(true);
    };

    useEffect(() => {
        const serviceUUID = '347f1281-56ee-488b-a55a-4afbf234fa8c'; 
        const characteristicUUID = '347f1281-56ee-488b-a55a-4afbf234fa8e';

        if (isDeviceConnected) {
        BleServices.readCharacteristic(serviceUUID, characteristicUUID, (value) => {
            let info = OdriveInfo(value);
            setOdriveInfo(info);
            if (info.speed) {
                setOdriveSpeed(info.speed);
            }
        });
    }
}, [isDeviceConnected]);
    return (
        <View style={styles.container}>
            <View style={styles.leds}>
            <LedStates ledColor={odriveInfo.color} odriveId={odriveInfo.id} resetLedColors={resetLedColors} onLedColorsReset={handleLedColorsReset}/>
                </View>
            <View style={styles.connectionButton}>
                <ConnectionButton setIsDeviceConnected={setIsDeviceConnected} />
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
            <View style={styles.joystick}>
                <Steering 
                    size={100}
                    onMove={({ angle, distance }) => {
                        console.log(`Angle: ${angle}, Distance: ${distance}`);
                    }}/>
            </View>
            <View style={styles.disconnectButton}>
                <DisconnectButton handleDisconnect={handleDisconnect} />
            </View>
            <View style={styles.speedSeg}>
                <SpeedSeg speed={odriveSpeed}/>
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
        top: 400,
    },
    startButton: {
        position: 'absolute',
        right: 250,
        top: 400,
    },
    clearErrorButton: {
        position: 'absolute',
        right: 143,
        top: 400,
    },
    torqueSlider: {
        flex: 1,
        position: 'absolute',
        left: 150,
        top: 600,
    },
    disconnectButton: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    speedSeg: {
        position: 'center',
        top: 35,
    },
    joystick: {
        flex: 1,
        position: 'absolute',
        left: 85,
        top: 500,
    },

});

export default App;