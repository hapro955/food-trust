import React, { Component } from 'react';
import { Text, View, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native';
import { Permissions, Camera } from 'expo';
import Icon from "react-native-vector-icons/FontAwesome";

export default class CameraWork extends Component {
  camera = null;
  constructor (props) {
    super (props);
    this.state = {
      hasCameraPermission	: null,
      message : '',
      record: 'white',
		}
  }
    
  async componentWillMount() {
		const { status } = await Permissions.askAsync( Permissions.CAMERA);
		this.setState( { hasCameraPermission: status === 'granted' });
	}
	
  startVideo = async () => {
    if (!this.camera ) return;
    console.log("start");
    try {
			this.setState( { record: 'red' });
		  const data = await this.camera.recordAsync({ });
			console.log( data);
		} catch ( error) {
		  this.setState( { message: error });
      throw error;
		}
	}

	stopVideo = () => {
		if (!this.camera ) return;
    console.log("stop");
    this.setState( { record: 'white' });
		this.camera.stopRecording();
  }

  recordVideo = async ()=>{
      console.log(this.state.record);
      if(this.state.record==='white'){
        this.startVideo();
      }else{
        this.stopVideo();
      }
  }
    
  render() {
    const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else {
    return (
      // <Modal
      //   animationType	= { 'slide' }
			// 	transparent		= { false }
			// 	onRequestClose={() => { } } >
      <View style={{ flex: 1 }}>
          <Camera
            ref	  = { (cam) => { this.camera = cam; } }
    				style = { styles.preview }
    				type  = { Camera.Constants.Type.back }
    				onCameraReady  = { () => { 
    				   this.setState( { message : 'Camera Ready !'})
    				}}>
          <View style={styles.container}>
          <TouchableOpacity
                style={styles.capture}
                onPress={this.recordVideo}>
                <Icon name="stop-circle-o"
                  style={[{color: this.state.record},{ fontSize: 80, marginBottom: 10 }]}
                />        
                </TouchableOpacity>
      </View>
      </Camera>
  		</View>
			// </Modal>
    );
		}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  preview: {
   flex: 1,
   backgroundColor: 'transparent',
   justifyContent: 'center',
   height: Dimensions.get('window').height,
   width: Dimensions.get('window').width
 },
 capture: {
  width: 90,
  height: 90,
  backgroundColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'center'
}
});