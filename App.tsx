import React from 'react';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Main from './src/Main';

function App(): JSX.Element {
  return (
    <>
      <Toast />
      <PaperProvider>
        <Main />
      </PaperProvider>
    </>
  );
}

export default App;
