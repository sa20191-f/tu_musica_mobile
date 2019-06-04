import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';
import t from 'tcomb-form-native';


const Form = t.form.Form;

const AddList = t.struct({
  nameList: t.String,
  urlImage: t.String,
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginTop: 20,
      marginBottom: 10,
      marginHorizontal: 20
    },
  },
  controlLabel: {
    normal: {
      color: 'white',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    error: {
      color: 'white',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  },
  textbox: {
    normal: {
      color: 'white',
      borderWidth: 1,
    },
    error: {
      color: 'white',
      borderWidth: 1,
    }
  }
}

const options = {
  fields: {
    nameList: {
      stylesheet: formStyles,
    },
    urlImage: {
      stylesheet: formStyles,
    }
  },
};

class AddListScreen extends React.Component {
  static navigationOptions = {
    title: 'Adicionar listas',
  };
  state = {
    
  }
  _createList = async(mutation) => {
    const value = this._form.getValue();
    if (value) {
      const list = {
        name: value.nameList,
        image: value.urlImage,
        user_id: 1
      }
      await mutation({
        variables: { list },
      });
      this.props.navigation.goBack();
    }
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/images/lists-background.jpg')}
        style={styles.backgroundStyle}
      >
        <View style={styles.container}>
          <Form
            ref={c => this._form = c}
            type={AddList}
            options={options}
          />
          <Mutation mutation={ADD_LIST}>
            {(addList) => 
              <Button
                title='Crear'
                style={styles.buttonStyle}
                onPress={() => this._createList(addList)}
              />
            }
          </Mutation>
        </View>
      </ImageBackground>
    )
  }
}
const ADD_LIST = gql`
  mutation createList($list: ListInput!){
    createList(list: $list) {
      name
      image
      user_id
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(0,0,0,0.7)',
  },
  buttonStyle: {
    marginTop: 10,
    marginHorizontal: 20
  },
  backgroundStyle : {
    flex: 1,
    width: '100%',
    height: '100%',
  }
})
export default withNavigation(AddListScreen);