import firebase from 'firebase';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import config from './config';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { peoples: [] };
  }
  componentWillMount() {
    firebase.initializeApp(config);
    this.listenPeoples();
  }

  getRandomName() {
    const names = ['John', 'Adney', 'Charles', 'Zoo', 'Mike', 'Jane', 'Jennifer', 'Lana', 'Monica'];
    const random = Math.floor(Math.random() * 10);
    return names[random];
  }

  listenPeoples() {
    const people = firebase.database().ref('people');
    people.on('value', (snapshot) => {
      const peoples = [];

      snapshot.forEach((childSnapshot) => {
        peoples.push(childSnapshot.val());
      });

      this.setState({ ...this.state, peoples });
    });
  }

  save() {
    firebase.database().ref('people').push().set({
      name: this.getRandomName(),
    });
  }

  remove() {
    firebase.database().ref('people').remove();
  }

  renderPeople() {
    const peoples = this.state.peoples || [];
    return peoples.map((people, i) => <Text key={`people-${i}`} style={styles.peoples}>{people.name}</Text>);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>  
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <View style={styles.buttons}>
            <Button
              onPress={() => this.save()}
              title="Add"
              color="#78ca00"
              accessibilityLabel="Add"
              style={styles.button}
            />
            <Button
              onPress={() => this.remove()}
              title="Remove"
              color="#f00f00"
              accessibilityLabel="Remove"
              style={styles.button}
            />
          </View>
        </View>  
        <View style={styles.result}>
          {this.renderPeople()}  
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 2,
    padding: 10,
    paddingTop: 50,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    marginRight: 5,
  },
  result: {
    flex: 4,
  },
  peoples: {
    fontSize: 20,
  }
});
