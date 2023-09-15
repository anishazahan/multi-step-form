import "@/styles/globals.css";
import { AppProps } from "next/app";

type NextComponentWithLayout = React.ComponentType & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as NextComponentWithLayout).getLayout ||
    ((page: React.ReactNode) => page);

  return getLayout(<Component {...pageProps} />);
}
