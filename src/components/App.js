import React from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Guard from './Entry/Guard/Guard';
import { actions } from '../redux/actions';

import '../config/constant.scss';
import '../services/mocks/mocks';
import store from '../redux/store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Guard />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
