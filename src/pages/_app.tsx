import { store } from "../redux/store";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

type NextComponentWithLayout = React.ComponentType & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as NextComponentWithLayout).getLayout ||
    ((page: React.ReactNode) => page);

  return (
    <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
  );
}
