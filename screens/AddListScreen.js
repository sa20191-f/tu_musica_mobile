import React from 'react';
import { StyleSheet, FlatList, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import ListItem from '../components/ListItem';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';


class AddListScreen extends React.Component {
  static navigationOptions = {
    title: 'Adiconar listas',
  };
  state = {
    
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/images/lists-background.jpg')}
        style={styles.backgroundStyle}
      >
        <View style={styles.container}>
          
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(0,0,0,0.7)',
  },
  listContainer: { 
    flexGrow: 1,
  },
  buttonStyle: {
    margin: 10,
  },
  backgroundStyle : {
    flex: 1,
    width: '100%',
    height: '100%',
  }
})
export default withNavigation(AddListScreen);