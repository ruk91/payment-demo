import React, { Component } from 'react';
import { 
  BrowserRouter, 
  Route, 
  Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from "react-redux";
import store from "./redux/store/index";

import Payment from './views/payment/Payment'
import LoadingPage from './views/loadingPage/LoadingPage'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Payment} exact />
            <Route path="/loading" component={LoadingPage} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;