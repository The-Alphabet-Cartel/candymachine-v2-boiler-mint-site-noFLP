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
              <h3 className="pb-3">Our Latest Collection: Vikingum (Run #1)!</h3>
              <p className="text-primary-color">
                This is a multi-run, limited edition collection of 175 different viking themed A.I. creations.
                Each run will have no more than 25 NFTs available for purchase (Minting).
                There is no auction, simply add your wallet, and click "Mint".
                Mints are given on a first come, first served basis, and are randomly handed out.
                Once all NFTs are sold, that's it for that run.
              </p>
              <hr />
              <br />
              <p className="text-secondary-color">
                <img src="/img/runs/vikingum/39.png" height="100" alt="" />
                <img src="/img/runs/vikingum/22.png" height="100" alt="" />
                <img src="/img/runs/vikingum/51.png" height="100" alt="" />
                <img src="/img/runs/vikingum/78.png" height="100" alt="" />
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
            <hr />
            <br />
            <p className="text-secondary-color">
              <img src="/img/runs/angels/0.png" height="100" alt="" />
              <img src="/img/runs/angels/1.png" height="100" alt="" />
              <img src="/img/runs/angels/3.png" height="100" alt="" />
              <img src="/img/runs/angels/4.png" height="100" alt="" />
            </p>
          </div>

          <div id="link2" className="container">
            All proceeds from our sales go towards (in order of importance):
            <ol>
              <li>Building a better community for our LGBTQIA+ creators and artists</li>
              <li>Providing technology to said artists and creators who may not be able to afford them</li>
              <li>Providing teaching and learning opportunities for our creators, artists, and supporters</li>
              <li>A small portion of our proceeds are designated to helping our furry companions by way of supporting K9 Trust, a 501(c)(3) dog rescue</li>
              <li>Other opportunities as deemed fitting by The Alphabet cARTel Staff Members</li>
            </ol>
          </div>

          <div id="link4" className="container faq">
            <h1 style={{ padding: "0 0 24px 0" }}>FAQ</h1>
            <div>
              <h4>What is an NFT?</h4>
              <p>
                <blockquote>
                  A non-fungible (meaning unique, non-replaceable) token (NFT) is a unique digital code that represents some kind of digital item.
                  It could be digital art or music, for example. An NFT is secured and stored on a public blockchain.
                  One token is not interchangeable for another, and a token cannot be further divided.
                </blockquote>
                In short, an NFT is a digital Proof of Ownership.
              </p>

              <hr />
            </div>

            <div>
              <h4>So I own the print(s) that I mint?</h4>
              <p>
                Yes!<br />
                You can do whatever you want with your minted print, because, you have become the sole owner of that particular print.
                Have it printed on canvas, frame it, hang it up for all to see, it is yours
                (unless you decide to sell it, then it transfers to the new owner).
              </p>

              <hr />
            </div>

            <div>
              <h4>No refunds?</h4>
              <p>
                Correct. What you get is what you get.
                We promise that you are getting a unique item and retain full ownership over said NFT unless you decide to sell it.
                If you're adamanat about not wanting it, you can, of course, resell it to someone else, and mint another if you wish, but yes, no refunds.
              </p>

              <hr />
            </div>

            <div>
              <h4>I don't really want an NFT, but I would still like to support the cause.</h4>
              <p>
                Thank you!<br /><br />
                From the bottom of our collective hearts, Thank you!<br /><br />
                To support us directly you can send any amount of SOL to the address:<br />
                <blockquote>xCwosCjTN2x9SYNrkhDq2MFvauZdZ6xTb2wv9zfNSA9</blockquote>
                or
                <blockquote>@AlphabetCartel</blockquote>
              </p>

              <hr />
            </div>
          </div>
      </div>
    </div>
  );
};

export default App;