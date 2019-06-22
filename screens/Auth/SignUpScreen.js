import React from 'react';
import { View, StyleSheet, Button, Text, AsyncStorage} from 'react-native';
import { Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  email: t.String,
  password: t.String,
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

const options = {
  fields: {
    username: {
      stylesheet: formStyles,
    },
    email: {
      stylesheet: formStyles,
    },
    password: {
      stylesheet: formStyles,
    }
  },
};

class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Crea una cuenta',
  };
  state = {

  }
  _handleSubmit = async(mutation) => {
    const value = this._form.getValue();
    if (value) {
      const user = {
        username: value.username,
        email: value.email,
        password: value.password
      }
      await mutation({
        variables: { user },
      });

      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textContainer}>Bienvenido a esta gran familia!</Text>
        <Form
          ref={c => this._form = c}
          type={User}
          options={options}
        />
        <Mutation mutation={CREATE_USER}>
          {(createUser) =>
            <Button
              title="Sign up!"
              // onPress={() => this._handleSubmit(createUser)}
              onPress={() => {
                this._handleSubmit(createUser);
                this._navigate();
              }}

            />
          }
        </Mutation>
        <Text style={styles.smallTextContainer}>¿Ya tienes una cuenta? Inicia sesión</Text>
        <Button
          title="Log in!"
          onPress={this._navigate}
        />
      </View>
    );
  }

  _navigate = () => {
    this.props.navigation.navigate('LoginScreen');
  }
}
const CREATE_USER = gql`
  mutation createUser($user: UserInput!){
    createUser(user: $user) {
      username
      email
      password
    }
  }
`;

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

export default withNavigation(SignUpScreen);
