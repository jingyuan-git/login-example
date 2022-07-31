import { useState } from 'react'
import { HashRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import AuthRouter from "@/routers/utils/authRouter";
import Router from "@/routers/index";
import { setWeakOrGray } from "@/redux/modules/global/action";
import { setLanguage } from "@/redux/modules/global/action";
import { connect } from "react-redux";

import reactLogo from './assets/react.svg'
import './App.css'

const App = (props: any) => {
  const { assemblySize } = props;

  return (
    <HashRouter>
      <ConfigProvider componentSize={assemblySize}>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </ConfigProvider>
    </HashRouter>
  );
}

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setWeakOrGray, setLanguage };
export default connect(mapStateToProps, mapDispatchToProps)(App);
