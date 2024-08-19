import {ethers} from "ethers";
import { useDispatch } from 'react-redux';
import { setAccount } from '../store/slicers/accounts';

function useSetAccount() {

    const dispatch = useDispatch();

    const connectAccount = async () => {
        if(!window.ethereum) {
            throw Error("You have to use Metamask")
        } else {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            const account = await provider.send("eth_requestAccounts", [])
            const walletAddress = account[0]
            
            dispatch(setAccount(walletAddress));

            if(!window.ethereum.chainId === "0xaa36a7") {

                console.log("oulalal, switch to the correct network");

                try {
                
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: "0xaa36a7"}],
                    });
                    console.log("You have succefully switched to Sepolia Test network")
                
                } catch (switchError) {
                    
                    // This error code indicates that the chain has not been added to MetaMask.
                    if (switchError.code === 4902) {
                        console.log("This network is not available in your metamask, please add it")

                        try {
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                { chainId: '0xaa36a7', 
                                chainName:'Sepolia test ağı',
                                rpcUrls:['https://sepolia.infura.io/v3/'],
                                blockExplorerUrls:['https://sepolia.etherscan.io'],
                                nativeCurrency: {
                                symbol:'SepoliaETH', // 2-6 characters long
                            decimals: 18
                            }
                                
                                }],
                            });
                            } catch (addError) {
                                // handle "add" error
                                console.log(addError);
                            }
                    }
                }
            }
        }
    }
    return {connectAccount}
}

export default useSetAccount