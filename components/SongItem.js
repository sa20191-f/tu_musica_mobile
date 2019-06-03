import React from 'react';
import { Image, View, StyleSheet, Platform } from 'react-native'; 
import { StyleText } from './StyleText';
import { Icon } from 'expo';

class SongItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, image, subtitle } = this.props;
    return (
      <View style={styles.singleAlbumContainer}>
        <View style={styles.imageContainer}>
          <Image 
            style={styles.imageStyle}
            source={image ? image : require('../assets/images/music-album2.jpg')}
          />
        </View>
        <View style={styles.albumInfoContainer}>
          <StyleText style={styles.albumText}>
            {title}
          </StyleText>
          <StyleText style={{ color: 'white', }}>
            {subtitle}
          </StyleText>
        </View>
        <View style={styles.buttonContainer}>
          <Icon.Ionicons
            name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
            size={45}
            style={{ color: 'white', }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  singleAlbumContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(216, 216, 216)',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  albumInfoContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 15,
  },
  imageStyle: {
    width: 60,
    height: 60,
  },
  albumText: {
    fontSize: 18,
    marginBottom: 0,
    textTransform: 'uppercase',
    color: 'white',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }
});

export default SongItem;