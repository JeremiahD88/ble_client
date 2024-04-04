import React from 'react';
import { BleServices } from './BleServices';


const sendSteering = async (torque) => {
    let dir;
    if (torque < 0) {
        dir = 0;
    } else {
        dir = 1;
    }
    await BleServices.writeCharacteristic('0x02', '0x06', dir, '0x00', '0x00', Math.abs(torque));
    console.log('Sending steering: ',  Math.abs(torque));
};

export default sendSteering;