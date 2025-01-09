// bugSolution.js
import * as React from 'react';
import { Camera, useCameraDevices, useFrameProcessor, CameraType } from 'expo-camera';
import { StyleSheet, Text, View, Button } from 'react-native';

// ... rest of the code

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);
  const devices = useCameraDevices();
  const [camera, setCamera] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

if (hasPermission === null) {
    return <View><Text>Requesting permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  const handleCameraChange = async () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  return (
    <View style={styles.container}>
      {devices?.map((device) => (
        <Camera
          key={device.uuid}
          style={styles.camera}
          type={type}
          device={device}
          onCameraReady={() => setCamera(device)} 
        />
      ))}
      <Button title="Flip Camera" onPress={handleCameraChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
});