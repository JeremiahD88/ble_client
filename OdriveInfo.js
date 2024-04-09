import errorCodes from './OdriveErrorCodes';
import { Alert } from 'react-native';
import { BleServices } from './BleServices';

let alertShown = false; // Add this line

const OdriveInfo = (value) => {
    let odriveId = value[0];
    let odriveCmd = value[1];
    let odriveState = value[6];
    let odriveErrorCheck = value[2] + value[3] + value[4] + value[5];

    let odriveInfo = { id: odriveId, speed: 0}; 

    if (odriveCmd === 0x01){
        if (odriveErrorCheck !== 0){
            let errors = Array(4).fill().map((_, i) => value[2 + i] << (i * 8));
            let errorMessages = '';
    
            errors.forEach((error, index) => {
                if (errorCodes.hasOwnProperty(error)) {
                    console.log(`Odrive error${index + 1}: ${errorCodes[error]}`);
                    odriveInfo.color = '#8b0000'; // Red for error
                    errorMessages += `Error Code: ${error}\nError Message: ${errorCodes[error]}\n\n`;   
                }
            });
    
            if (!alertShown && errorMessages) { // Move this line outside of the forEach loop
                Alert.alert(
                    "Odrive Error",                
                    `ID: ${odriveInfo.id}\n${errorMessages}`, 
                    [
                        { 
                            text: "Clear Errors", 
                            onPress: () => {
                                console.log("OK Pressed");
                                console.log('Clearing errors...');
                                BleServices.writeCharacteristic('0x03');
                                alertShown = false; // Flip the alertShown bool back to false
                            } 
                        }
                    ],
                    { cancelable: false }
                );
                alertShown = true; 
            }
        }
        else if (odriveState === 1) {
            odriveInfo.color = '#1400a0'; // Blue for idle
        }
        else if (odriveState === 8) {
            odriveInfo.color = '#1a600f'; // Green for closed loop control
        }
    }
             
    else if (odriveCmd === 0x09) {
        let buffer = new ArrayBuffer(4);
        let view = new DataView(buffer);
        view.setUint8(0, value[6]);
        view.setUint8(1, value[7]);
        view.setUint8(2, value[8]);
        view.setUint8(3, value[9]);
        let odriveSpeed = Math.abs(view.getFloat32(0, true)); // true for little endian
        let odriveKmh = (odriveSpeed * 0.66) * 3.6; // Convert to km/h
        odriveInfo.id = undefined;
        odriveInfo.speed = odriveKmh.toFixed(1);
    }

    return odriveInfo || { color: '#8b0000' }; // Default color
};

export default OdriveInfo;