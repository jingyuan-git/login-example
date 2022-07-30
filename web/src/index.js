import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { SET_USER,REACT_REDUX_LOCAL } from "./constants"

/**
 * 判断本地登陆状态
 */
if(localStorage.getItem(REACT_REDUX_LOCAL)){
  /**
   * 触发一个actions
   */
  store.dispatch({
    type:SET_USER,
    user:JSON.parse(localStorage.getItem(REACT_REDUX_LOCAL))
  })
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
