import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native'; 

class ListItem extends React.Component {
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
            source={image ? image : require('../assets/images/music-album.png')}
          />
        </View>
        <View style={styles.albumInfoContainer}>
          <Text style={styles.albumText}>
            {title}
          </Text>
          <Text>
            {subtitle}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  singleAlbumContainer: {
    padding: 10,
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  albumInfoContainer: {
    paddingVertical: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 50,
    height: 50,
  },
  imageContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  albumText: {
    fontSize: 18,
    marginBottom: 0,
    textTransform: 'uppercase',
  },
});

export default ListItem;