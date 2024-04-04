import React, { useState, useEffect, useRef } from 'react';
import Slider from '@react-native-community/slider';
import sendSteering from './sendSteering';

const TorqueSlider = () => {
    const [value, setValue] = useState(0);
    const valueRef = useRef(value);
    const timerRef = useRef(null);

    const handleValueChange = (newValue) => {
        console.log('Steering value:', newValue);
        setValue(newValue);

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        const step = newValue > valueRef.current ? 10 : -10;

        timerRef.current = setInterval(() => {
            if ((step > 0 && valueRef.current < newValue) || (step < 0 && valueRef.current > newValue)) {
                valueRef.current += step;
                sendSteering(valueRef.current);
            } else {
                clearInterval(timerRef.current);
                sendSteering(newValue);
            }
        }, 50);
    };

    return (
        <Slider
            style={{width: 300, height: 40, transform: [{ rotate: '-90deg'}]}}
            minimumValue={-255}
            maximumValue={255}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            thumbTintColor='white'
            value={0}
            step={10}
            onValueChange={handleValueChange}
        />
    );
}

export default TorqueSlider;