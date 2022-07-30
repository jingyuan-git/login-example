import logo from './logo.svg';
import { Button } from 'antd';
import { NavLink, useRoutes } from 'react-router-dom'
import routes from './routes'
import './App.less';
import Header from './components/Login'
import React from 'react';

function App () {
  const element = useRoutes(routes)
  return (
    <div className="App">
      {element}
    </div>
  );
}

export default App;
