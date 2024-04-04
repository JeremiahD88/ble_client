const OdriveInfo = (value) => {
    let odriveId = value[0];
    let odriveCmd = value[1];
    let odriveState = value[6];
    let odriveError = value[2] + value[3] + value[4] + value[5];

    let odriveInfo = { id: odriveId, speed: 0 }; // Default color

    if (odriveCmd === 0x01){
        if (odriveError !== 0){
            console.log('Error:', odriveError);
            odriveInfo.color = 'red'; // Red for error
        }
        else if (odriveState === 1) {
            //console.log('Odrive is idle');
            odriveInfo.color = 'blue'; // Blue for idle
        }
        else if (odriveState === 8) {
            console.log('Odrive is closed loop control');
            odriveInfo.color = 'green'; // Green for closed loop control
        }
    } else if (odriveCmd === 0x09) {
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

    return odriveInfo || { color: 'red' }; // Default color
};

export default OdriveInfo;