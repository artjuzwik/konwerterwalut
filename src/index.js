import React from 'react';
import ReactDOM from 'react-dom';
import Container from './container/container.jsx'
import * as serviceWorker from './serviceWorker';
import Routes from './routes/routes.js'
import './main.scss'

sessionStorage.removeItem('visited')

if(window.location.pathname !== Routes.converter && window.location.pathname !== Routes.history){
  window.location.pathname = Routes.converter
}

ReactDOM.render(
  <React.StrictMode>
    <Container />
  </React.StrictMode>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
