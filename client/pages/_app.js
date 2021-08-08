import "../styles/globals.scss";
import "../styles/fonts.scss";
import "../styles/null.scss";
import { Provider } from "react-redux";
import { wrapper, store } from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
