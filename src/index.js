import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStylesStyled from "./styles/globalStyles/GlobalStyles.styled";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(
  <React.StrictMode>
    <GlobalStylesStyled />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
