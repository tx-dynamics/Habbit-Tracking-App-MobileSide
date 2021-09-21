import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  ActivityIndicator,
  Pressable
} from 'react-native';
import { Colors } from '../Constants/Colors'
import { wp, hp } from '../Helpers/Responsiveness'

const NewAlert = props => {
  const {
    show,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={show}
      onRequestClose={() => { console.log('close modal') }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Text style={{marginTop:wp(10), fontSize:18, fontWeight:"bold", textAlign:"center"}}>{props.text}</Text>
          <View style={{flex:1 }}>
            <View style={{ flexDirection: "row",justifyContent:"flex-end", flex:1, alignItems:"flex-end", marginBottom:wp(5), marginRight:wp(4)}}>
            {/* <Pressable style={{ backgroundColor: Colors.White , width:wp(20), alignItems:"center"}}>
              <Text style={{paddingVertical:8}}>Cancel</Text>
            </Pressable> */}
            <Pressable onPress={props.onPressOk}
            style={{ backgroundColor: Colors.Yellow,  width:wp(20), marginLeft:wp(4), alignItems:"center", borderRadius:5 }}>
              <Text style={{paddingVertical:8}}>Ok</Text>
            </Pressable>
          </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: wp(40),
    width: wp(85),
    borderRadius: 10,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-around'
  }
});

export default NewAlert;