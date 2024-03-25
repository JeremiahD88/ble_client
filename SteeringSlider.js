import React from 'react';
import Slider from '@react-native-community/slider';

const SteeringSlider = () => {
    const handleValueChange = (value) => {
        console.log('Steering value:', value);
        // Add slider logic here
    };

    return (
        <Slider
            style={{width: 300, height: 40}}
            minimumValue={0}
            maximumValue={255}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            thumbTintColor='black'
            value={127}
            step={1}
            onValueChange={handleValueChange}
        />
    );
}

export default SteeringSlider;