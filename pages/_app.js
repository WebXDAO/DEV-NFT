import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Provider, useSession, getSession, signOut } from "next-auth/client";
import { SessionProvider } from "next-auth/client";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

function MyApp({ Component, pageProps }) {
  // Get next-auth session
  const session = pageProps.session;

  /**
   * The chain ID 4 represents the Rinkeby network
   * The `injected` connector is a web3 connection method used by Metamask
   */
  const supportedChainIds = [80001];
  const connectors = {
    injected: {},
  };

  return (
    <>
      <ThirdwebWeb3Provider
        supportedChainIds={supportedChainIds}
        connectors={connectors}
      >
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </ThirdwebWeb3Provider>
    </>
  );
}

export default MyApp;
