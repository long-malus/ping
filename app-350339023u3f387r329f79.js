import * from "https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js";

function connect() {
    async () => {
        if (window.ethereum) {
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Check if the network is BSC Testnet
                const chainId = '0x61'; // BSC Testnet chain ID
                const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });

                if (currentChainId !== chainId) {
                    // Switch to BSC Testnet
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    });
                }

                console.log('Connected to MetaMask and BSC Testnet');
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    }
}

function buy() {
    const contractAddress = '0xYourContractAddress'; // 替换为你的合约地址
    const contractABI = [ /* 合约的ABI数组 */ ]; // 替换为你的合约ABI

    const callFunctionButton = document.getElementById('callFunctionButton');

    callFunctionButton.addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                // 请求账户访问
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // 创建Web3实例
                const web3 = new Web3(window.ethereum);

                // 创建合约实例
                const contract = new web3.eth.Contract(contractABI, contractAddress);

                // 获取用户的第一个账户
                const accounts = await web3.eth.getAccounts();
                const account = accounts[0];

                // 调用合约函数
                const result = await contract.methods.myFunction().call({ from: account });

                console.log('Function result:', result);
            } catch (error) {
                console.error('Error calling contract function:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    }
}