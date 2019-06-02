import React from 'react';
import { ScrollView, StyleSheet, Text, Button} from 'react-native';
import { withNavigation } from 'react-navigation';

class InitialScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Initial</Text>
        <Button
          onPress={this._navigate}
          title="Descubre mas de nosotros"
        />
          
      </ScrollView>
    );
  }
  _navigate = () => {
    this.props.navigation.navigate('Main');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default withNavigation(InitialScreen);