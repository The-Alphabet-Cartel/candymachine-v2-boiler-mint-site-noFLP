import "./App.css";
import { useMemo } from "react";

import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet(), getMathWallet() ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button" >
          <img src="/icons/close.svg" alt="" onClick={toggleMenu}/>
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="/img/logo.png" alt="" />
          </li>
          <li>
            <a href="/#link1" onClick={toggleMenu}>
              Link 1
            </a>
          </li>
          <li>
            <a href="/#link2" onClick={toggleMenu}>
              Link 2
            </a>
          </li>
          <li>
            <a href="/#link3" onClick={toggleMenu}>
              Link 3
            </a>
          </li>
          <li>
            <a href="/#link4" onClick={toggleMenu}>
              Link 4
            </a>
          </li>
          <li>
            <div className="social-icons">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
              <img className="nav-social" src="/icons/discord.svg" alt="" />
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src="/img/logo.png" alt="" />
          <a className="hide-800" href="/#link1">
            Link 1
          </a>
          <a className="hide-800" href="/#link2">
            Link 2
          </a>
          <a className="hide-800" href="/#link3">
            Link 3
          </a>
          <a className="hide-800" href="/#link4">
            Link 4
          </a>
          <div className="social-icons hide-800">
            <img className="nav-social" src="/icons/twitter.svg" alt="" />
            <img className="nav-social" src="/icons/discord.svg" alt="" />
          </div>
        </div>
      </nav>

      <div className="content-wrapper">
        <header className="card" id="link1">
          <div style={{ padding: "0 24px 0 24px 0" }}>
            <h1 className="text-secondary-color">Welcome To</h3>
            <h3 className="pb-3">The Alphabet cARTel's Candy Machine!</h1>
            <p className="text-secondary-color">
              Here you will find our current offerings of our NFT collections.
              Our collections are a combination of human and AI artistry.
              We will be very clear on which collections are human created,
              and which are created via A.I. to avoid any misconceptions.
            </p>
          </div>
        </header>
      </div>

      <div className="content-wrapper">
        <header className="card" id="link1">
          <div style={{ padding: "0 24px 0 24px 0" }}>
            <h3 className="pb-3">Our Latest Collection: Vikingum!</h1>
            <p className="text-secondary-color">
              This is a limited edition collection of 175 different viking themed A.I. creations.
              There is no auction, simply add your wallet, and click "Mint".
              Mints are given on a first come, first served basis, and are randomly handed out.
              Once all 175 NFTs are sold, that's it for that run. Stay tuned for more if you missed it.
            </p>
            <p className="text-secondary-color">
              <img src="/img/vikingum/1.png" height="75" />
              <img src="/img/vikingum/39.png" height="75" />
              <img src="/img/vikingum/22.png" height="75" />
              <img src="/img/vikingum/51.png" height="75" />
              <img src="/img/vikingum/78.png" height="75" />
            </p>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                  <WalletDialogProvider>
                    
                      <Minter
                        candyMachineId={candyMachineId}
                        
                        connection={connection}
                        startDate={startDateSeed}
                        txTimeout={txTimeout}
                        rpcHost={rpcHost}
                      />
                    
                  </WalletDialogProvider>
                </WalletProvider>
              </ConnectionProvider>
            </ThemeProvider>
          </div>
        </header>

        <div id="link2" className="container">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac velit
          aliquet, semper sapien sed, ornare augue. Phasellus sed velit interdum,
          sagittis metus quis, facilisis lectus. Cras sollicitudin purus at magna
          eleifend maximus. Nulla nec nulla in nunc maximus viverra in at mauris.
          Fusce sodales dolor nisi, et vehicula orci porta id. In placerat nunc
          sed erat lacinia tincidunt. Interdum et malesuada fames ac ante ipsum
          primis in faucibus. Vestibulum commodo eget metus vitae tempus. Aliquam
          pharetra mi at efficitur accumsan. Curabitur venenatis libero a ex
          porttitor, at auctor turpis hendrerit. Nam commodo, risus non consequat
          pretium, erat ante auctor purus, a cursus dolor erat at velit. Maecenas
          dignissim, dolor sed laoreet aliquam, tortor lacus faucibus urna, eget
          mattis massa sem ac dui. Nam semper hendrerit interdum. Etiam at dictum
          nisi.
        </div>

        <div id="link3" className="container card">
          <h1 className="pb-3">Lorem ipsum</h1>
        </div>

        <div id="link4" className="container faq">
          <h1 style={{ padding: "0 0 24px 0" }}>FAQ</h1>
          <div>
            <h4>Lorem ipsum?</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              id metus id mauris tincidunt posuere. Vivamus neque odio, imperdiet
              vitae.
            </p>

            <hr />
          </div>

          <div>
            <h4>Lorem ipsum?</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              id metus id mauris tincidunt posuere. Vivamus neque odio, imperdiet
              vitae.
            </p>

            <hr />
          </div>

          <div>
            <h4>Lorem ipsum?</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              id metus id mauris tincidunt posuere. Vivamus neque odio, imperdiet
              vitae.
            </p>

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;