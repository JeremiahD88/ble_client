import React from 'react';
import { BleServices } from './BleServices';


const sendSteering = async (torque, angle) => {
    let dir;
    if (torque < 0) {
        dir = 0;
    } else {
        dir = 1;
    }
    await BleServices.writeCharacteristic('0x02', '0x07', dir, '0x00', '0x00', Math.abs(torque), angle);
    console.log('Sending steering: ',  Math.abs(torque));
    console.log('Sending angle: ', angle);
};

export default sendSteering;