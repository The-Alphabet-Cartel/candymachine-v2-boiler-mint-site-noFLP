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
            <a href="https://candy.alphabetcartel.com">
              <img className="mobile-nav-logo" src="/img/logo.png" alt="" />
            </a>
          </li>
          <li>
            <a href="https://gallery.alphabetcartel.com" onClick={toggleMenu}>
              The Alphabet cARTel - NFT Gallery
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
          <a href="https://candy.alphabetcartel.com">
            <img className="nav-logo" src="/img/logo.png" alt="" />
          </a>
          <a href="https://gallery.alphabetcartel.com" onClick={toggleMenu}>
            The Alphabet cARTel - NFT Gallery
          </a>
          <div className="social-icons hide-800">
            <img className="nav-social" src="/icons/twitter.svg" alt="" />
            <img className="nav-social" src="/icons/discord.svg" alt="" />
          </div>
        </div>
      </nav>

      <div className="content-wrapper">
        <div id="link2" className="container">
          <h1 className="text-secondary-color">Welcome To The</h1>
          <h3 className="pb-3"><img src="/img/logo2.png" alt="Alphabet cARTel Logo" />'s Candy Machine!</h3>
          <p className="text-secondary-color">
            Here you will find our current offerings of our NFT collections.
            Our collections are a combination of human and AI artistry.
            We will be very clear on which collections are human created,
            and which are created via A.I. to avoid any misconceptions.
          </p>
        </div>
      </div>

      <div className="content-wrapper">
          <header className="card" id="link1">
            <div style={{ padding: "0 24px 0 24px 0" }}>
              <h3 className="pb-3">Our Latest Collection: Vikingum!</h3>
              <p className="text-primary-color">
                This is a limited edition collection of 175 different viking themed A.I. creations.
                There is no auction, simply add your wallet, and click "Mint".
                Mints are given on a first come, first served basis, and are randomly handed out.
                Once all 175 NFTs are sold, that's it for that run. Stay tuned for more if you missed it.
              </p>
              <p className="text-secondary-color">
                <img src="/img/vikingum/1.png" height="100" alt="" />
                <img src="/img/vikingum/39.png" height="100" alt="" />
                <img src="/img/vikingum/22.png" height="100" alt="" />
                <img src="/img/vikingum/51.png" height="100" alt="" />
                <img src="/img/vikingum/78.png" height="100" alt="" />
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

          <div id="link3" className="container card">
            <h3 className="pb-3">Our Upcoming Collection: Angels!</h3>
            <p className="text-primary-color">
              This will be a limited edition collection of 200 different angel themed A.I. creations.
              As usual, there will be no auction, simply add your wallet, and click "Mint".
              Mints will be given on a first come, first served basis, and are randomly handed out.
            </p>
            <p className="text-secondary-color">
              <img src="/img/angels/0.png" height="100" alt="" />
              <img src="/img/angels/1.png" height="100" alt="" />
              <img src="/img/angels/2.png" height="100" alt="" />
              <img src="/img/angels/3.png" height="100" alt="" />
              <img src="/img/angels/4.png" height="100" alt="" />
            </p>
          </div>

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