import Web3 from "web3";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const SERVER_URL_X = process.env.REACT_APP_SERVER_URL_X;

export const PrimaryGrey = "#828488";

export const ChainsConfig = {
    POLYGON_TESTNET: {
        chainId: Web3.utils.toHex(80001),
        rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
        chainName: "Polygon Testnet",
        nativeCurrency: {
            name: "tMATIC",
            symbol: "tMATIC",
            decimals: 18,
        },
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
        contract_address: "0x9a3FbCb823f2Bc9210cb301e5F0cCA8a4E2Ce4cD",
    },
    FUJI: {
        chainId: Web3.utils.toHex(43113),
        rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
        chainName: "Avalanche Fuji",
        nativeCurrency: {
            name: "AVAX",
            symbol: "AVAX",
            decimals: 18,
        },
        blockExplorerUrls: ["https://cchain.explorer.avax-test.network/"],
        contract_address: "0x87C377fDe75f49e64ACC8a8F4cc0F601458f205C",
    },
};

export const CHAIN = ChainsConfig["FUJI"];