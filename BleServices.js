import { PermissionsAndroid } from 'react-native';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import OdriveInfo from './OdriveInfo';

const manager = new BleManager();

const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location permission for bluetooth scanning",
          message: "Needed for bluetooth scanning",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission for bluetooth scanning granted");
        return true;
      } else {
        console.log("Location permission for bluetooth scanning denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const requestBluetoothPermission = async () => {
    const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (status !== RESULTS.GRANTED) {
      const requestStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      return requestStatus === RESULTS.GRANTED;
    }
    return status === RESULTS.GRANTED;
  };

let connectedDevice = null; 

export const BleServices = {
    connectToDevice: async (deviceName, setIsDeviceConnected) => {
      // Request necessary permissions
      const locationPermissionGranted = await requestLocationPermission();
      const bluetoothPermissionGranted = await requestBluetoothPermission();
  
      if (locationPermissionGranted && bluetoothPermissionGranted) {
        console.log('Both permissions are granted');
        
        // Start scanning
        manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log('Scanning failed:', error);
          } else if (device && device.name === deviceName) {
            console.log(`Device ${deviceName} found`);
            manager.stopDeviceScan();
  
            device.connect()
              .then((device) => {
                console.log(`Connected to ${deviceName}`);
                connectedDevice = device; // Store the connected device
                return device.discoverAllServicesAndCharacteristics();
              })
              .then((device) => {
                console.log('Services and characteristics discovered');
                setIsDeviceConnected(true);
              })
              .catch((error) => {
                console.log(`Failed to connect to ${deviceName}:`, error);
              });
          }
        });
      } else {
        console.log('One or both permissions are denied');
      }
    },
    disconnectDevice: async () => {
      if (connectedDevice) {
        return connectedDevice.cancelConnection()
          .then(() => {
            console.log('Disconnected');
            connectedDevice = null; // Clear the reference
          })
          .catch((error) => {
            console.log('Failed to disconnect:', error);
          });
      } else {
        console.log('No device to disconnect');
        return Promise.resolve();
      }
    },
  
    writeCharacteristic: async (msgID, msgLen, direction, duration1, duration2, speed) => {
        const serviceUUID = '347f1281-56ee-488b-a55a-4afbf234fa8c'; // Replace with your service UUID
        const characteristicUUID = '347f1281-56ee-488b-a55a-4afbf234fa8d'; // Replace with your characteristic UUID
      
        if (connectedDevice) {
          // Create a buffer with the data
          let buffer = new Uint8Array(6);
          buffer.fill(0); // Clear buffer
          
          buffer[0] = msgID;
          buffer[1] = msgLen;
          buffer[2] = direction;
          buffer[3] = duration1; // High byte
          buffer[4] = duration2; // Low byte
          buffer[5] = speed;
          //buffer[6] = angle; // TODO: Add angle to the buffer
      
          // Convert the buffer to a base64 string
          const data = Buffer.from(buffer).toString('base64');
      
          // Write the data to the characteristic
          await connectedDevice.writeCharacteristicWithResponseForService(serviceUUID, characteristicUUID, data)
          
            .then((characteristic) => {
              console.log('Data written to characteristic, with buffer:', buffer);
            })
            .catch((error) => {
              console.log('Failed to write data to characteristic:', error);
            });
        } else {
          console.log('No device connected');
        }
        
      },
  
      readCharacteristic: async (serviceUUID, characteristicUUID, onRead) => {
        if (connectedDevice) {
          console.log('Reading characteristic:', characteristicUUID);
          connectedDevice.monitorCharacteristicForService(serviceUUID, characteristicUUID, (error, characteristic) => {
            if (error) {
              console.log('Failed to read characteristic:', error);
            } else {
              let value = Buffer.from(characteristic.value, 'base64');
              onRead(value); // Call the callback function with the read value
            }
          });
        } else {
          console.log('No device connected');
        }
      },
  };


  /*// App.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LedStates from './LedStates';
import BleServices from './BleServices';

const App = () => {
    const [ledColor, setLedColor] = useState('red'); // Default color

    useEffect(() => {
        const serviceUUID = 'your-service-uuid'; // Replace with your service UUID
        const characteristicUUID = 'your-characteristic-uuid'; // Replace with your characteristic UUID

        // Pass a callback function to readCharacteristic
        BleServices.readCharacteristic(serviceUUID, characteristicUUID, (value) => {
            let info = OdriveInfo(value);
            setLedColor(info.color);
        });
    }, []);

    return (
        <View style={styles.container}>
            <LedStates color={ledColor} />
            {/* Rest of your code 
            </View>
            );
        } // BleServices.js
export const BleServices = {
    // Rest of your code

    readCharacteristic: async (serviceUUID, characteristicUUID, onRead) => {
        if (connectedDevice) {
          console.log('Reading characteristic:', characteristicUUID);
          connectedDevice.monitorCharacteristicForService(serviceUUID, characteristicUUID, (error, characteristic) => {
            if (error) {
              console.log('Failed to read characteristic:', error);
            } else {
              let value = Buffer.from(characteristic.value, 'base64');
              onRead(value); // Call the callback function with the read value
            }
          });
        } else {
          console.log('No device connected');
        }
      },
  };*/