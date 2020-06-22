import React from 'react';
import Login from './screens/login';
import Navigator from './routes/loginStack'

const App: () => React$Node = () => {
  return (
    <Navigator />
  );
};



export default App;
