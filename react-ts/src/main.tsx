import ReactDOM from "react-dom";
// import "@/styles/reset.less";
// import "@/assets/iconfont/iconfont.less";
import "antd/dist/antd.less";
// import "@/styles/common.less";
// import "@/language/index";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux";
import App from "@/App";

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
ReactDOM.render(
  // * react严格模式
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);