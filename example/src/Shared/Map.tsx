import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type Props = {
    markers: Array<{ 
        dane: string,
        state: string,
        city: string,
        library_name: string,
        library_address: string,
        Library_state: string,
        library_phone: string,
        latitude: number,
        longitude: number,
    }>
}

export default class Map extends React.Component <Props, {}> {
  render() {
    if(!this.props.markers || this.props.markers.length === 0) return <View />;
    
    let initial = this.props.markers[0]
    return (
      <View style={styles.container}>
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: initial.latitude,
                longitude: initial.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {
                this.props.markers.map((marker, index) => (
                    <Marker
                        key={`library-${index}`}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.library_name}
                        description={marker.library_address}
                        icon={require('../../assets/library-pin.png')}
                    />
                ))
            }
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
  },
  map: {
    flex: 1,
  }
});
