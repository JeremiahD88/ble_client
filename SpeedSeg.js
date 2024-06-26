import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SpeedSeg = ({ speed }) => {
   return (
      <View style={styles.background}>
         <Text style={styles.speed}>{speed}</Text>
         <Text style={{color: 'red', fontSize: 20, fontFamily: 'Seven Segment'}}>km/h</Text>
      </View>
   );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#200000',
        justifyContent: 'center',
        alignItems: 'center',
        width: 230, 
        height: 180, 
        borderRadius: 30,
        borderWidth: 4,
        borderColor: 'darkgrey', //#707070
    },
    speed: {
        fontSize: 130,
        color: 'red',
        fontFamily: 'Seven Segment',
    },
});

export default SpeedSeg;