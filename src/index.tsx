import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/reset.scss';
import './styles/index.scss';
import App from './components/app/App';
import { history } from './routing/history';


ReactDOM.render(
   <React.StrictMode>
      <Router history={history}>
         <Provider store={store}>
            <App />
         </Provider>
      </Router>
   </React.StrictMode>,
   document.getElementById('root')
);


reportWebVitals();