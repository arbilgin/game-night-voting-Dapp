import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractAbi } from './Constant/constant';
import Login from './Components/Login';
import Finished from './Components/Finished';
import Connected from './Components/Connected';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);

  useEffect(() => {
    getCandidates();
    getCurrentStatus();
    getRemainingTime();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });

  async function vote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);

    const tx = await contractInstance.vote(number);
    await tx.wait();
    canVote();
  }

  async function canVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    const voteStatus = await contractInstance.voted(await signer.getAddress());
    setCanVote(voteStatus);
  }

  async function getCandidates() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    const candidatesList = await contractInstance.getAllVotesOfCandidates();
    const formattedCandidates = candidatesList.map((candidate, index) => {
      return {
        index: index,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber()
      }
    });
    setCandidates(formattedCandidates);
  }

  async function getCurrentStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    const status = await contractInstance.getVotingStatus();
    console.log(status);
    setVotingStatus(status);
  }

  async function getRemainingTime() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    const time = await contractInstance.getRemainingTime();
    setRemainingTime(parseInt(time, 16));
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      canVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected: ", address);
        setIsConnected(true);
        canVote();
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Please install Metamask");
    }
  }

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  async function addVoltaNetwork() {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x12047",
          rpcUrls: ["https://volta-rpc.energyweb.org/"],
          chainName: "Volta",
          nativeCurrency: {
            name: "Volta",
            symbol: "VT",
            decimals: 18
          },
          blockExplorerUrls: ["https://volta-explorer.energyweb.org/"]
        }]
      });
    } catch (error) {
      console.log(error)
    }
  }

  // async function addNetworkToMetamask() {

  //   //const chainId = 73799 // Volta Testnet

  //   if (window.ethereum.networkVersion !== "0x12047") {
  //     try {
  //       await window.ethereum.request({
  //         method: 'wallet_switchEthereumChain',
  //         params: [{ chainId: "0x12047" }]
  //       });
  //     } catch (err) {
  //       // This error code indicates that the chain has not been added to MetaMask
  //       if (err.code === 4902) {
  //         await window.ethereum.request({
  //           method: 'wallet_addEthereumChain',
  //           params: [
  //             {
  //               chainName: 'Volta',
  //               chainId: "0x12047",
  //               nativeCurrency: { name: 'VOLTA', symbol: 'VT', decimals: 18 },
  //               rpcUrls: ['https://volta-rpc.energyweb.org/'],
  //               blockExplorerUrls: ['https://volta-explorer.energyweb.org/']
  //             }
  //           ]
  //         });
  //       }
  //     }
  //   }
  // }


  return (
    <div className="App">
      {votingStatus ? (isConnected ? <Connected
        account={account}
        candidates={candidates}
        remainingTime={remainingTime}
        number={number}
        handleNumberChange={handleNumberChange}
        voteFunction={vote}
        showButton={CanVote}
        addNetwork={addVoltaNetwork} /> : <Login connectWallet={connectToMetamask} addNetwork={addVoltaNetwork} />) : (<Finished />)}

    </div>
  );
}

export default App;