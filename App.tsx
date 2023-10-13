import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Gym_Feed from './src/screens/Gym_Feed';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={styles.conatiner}>
          <StatusBar barStyle={'light-content'} />
          <Gym_Feed />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
});
