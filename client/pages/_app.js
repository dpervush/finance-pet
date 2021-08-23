import { Provider } from "react-redux";
import axios from "axios";
import { store } from "../store";

import "../styles/globals.scss";
import "../styles/fonts.scss";
import "../styles/null.scss";

axios.defaults.baseURL = "http://localhost:8080/api";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
