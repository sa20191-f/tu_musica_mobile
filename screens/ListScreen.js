import React from 'react';
import { StyleSheet, FlatList, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import ListItem from '../components/ListItem';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Tus listas',
  };
  state = {
    lists: [],
    listRefreshing: true,
  }
  _getLists = async() => {
    this.setState({ listRefreshing: true });
    const response = await this.props.getLists.refetch();
    if (!response.errors || response.data === undefined) {
      this.setState({ lists: response.data.allList });
    }
    this.setState({ listRefreshing: false });
  }
  componentDidMount() {
    this._getLists();
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/images/lists-background.jpg')}
        style={styles.backgroundStyle}
      >
        <View style={styles.container}>
          <Button
            title='Adicionar lista'
            style={styles.buttonStyle}
          />
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={this.state.lists}
            renderItem={
              ({ item }) => <ListItem title={item.name} image={item.image} />
            }
            numColumns={2}
            keyExtractor={(item, index) => index}
            onRefresh={this._getLists}
            refreshing={this.state.listRefreshing}
          />
        </View>
      </ImageBackground>
    )
  }
}

const GET_LISTS = gql`
  query {
    allList{
      id
      name
      image
      list_vinculations{
        id
        user_id
      }
      song_vinculations{
        id
        song_id
      }      
    }
  }
`;

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
export default compose (
  graphql(GET_LISTS, {
    name: 'getLists',
  }),
)(ListScreen);