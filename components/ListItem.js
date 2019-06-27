import React from 'react';
import { Image, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'; 
import { StyleText } from './StyleText';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, image, subtitle, onPress } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.singleAlbumContainer}>
          <View style={styles.boxContainer}>
            <View>
              <Image 
                style={styles.imageStyle}
                source={image ? { uri: image } : require('../assets/images/music-album2.jpg')}
              />
            </View>
            <View style={styles.albumInfoContainer}>
              <StyleText style={styles.albumText}>
                {title}
              </StyleText>
              {subtitle &&
                <StyleText style={{ color: 'white', }}>
                {subtitle}
                </StyleText>
              }
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  singleAlbumContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  boxContainer: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  albumInfoContainer: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    
  },
  imageStyle: {
    width: 140,
    height: 150,
  },
  albumText: {
    fontSize: 18,
    marginBottom: 0,
    textTransform: 'uppercase',
    color: 'white',
  },
});

export default ListItem;