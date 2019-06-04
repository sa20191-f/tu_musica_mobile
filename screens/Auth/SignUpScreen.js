import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  email: t.String,
  password: t.String,
  // terms: t.Boolean
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Crea una cuenta',
  };
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textContainer}>Bienvenido a esta gran familia</Text>
        <Form
          ref={c => this._form = c}
          type={User}
        />
        <Button
          title="Sign up!"
          onPress={this.handleSubmit}
        />
        <Text style={styles.smallTextContainer}>¿Ya tienes una cuenta? Inicia sesión</Text>
        <Button
          title="Log in"
          onPress={this._navigate}
        />
      </View>
    );
  }
  _navigate = () => {
    this.props.navigation.navigate('LoginScreen');
  }
}

const styles = StyleSheet.create({
  textContainer: {
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  smallTextContainer: {
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 45,
    paddingBottom: 10,
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});