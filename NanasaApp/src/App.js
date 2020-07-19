/* eslint-disable prettier/prettier */
import React from 'react';
import Login from './screens/login';
import Navigator from './routes/drawer'


const App: () => React$Node = () => {
  return (
    <Navigator> <Login /></Navigator>
  );
};



export default App;
