import React from 'react';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Main from './src/Main';
import {Provider} from 'react-redux';
import {store} from './src/stores/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Toast />
      <PaperProvider>
        <Main />
      </PaperProvider>
    </Provider>
  );
}

export default App;
