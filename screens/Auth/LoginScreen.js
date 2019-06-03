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

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Accede a tu cuenta',
  };
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textContainer}>Bienvenido de vuelta</Text>
        <Form

          ref={c => this._form = c}
          type={User}
        />
        <Button
          title="Log in!"
          onPress={this.handleSubmit}
        />
        <Text style={styles.smallTextContainer}>¿No tienes una cuenta? Regístrate</Text>
        <Button
          title="Sign Up!"
          onPress={this._navigate}
        />
      </View>
    );
  }
  _navigate = () => {
    this.props.navigation.navigate('SignUpScreen');
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