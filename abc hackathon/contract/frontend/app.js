// Initialize web3 and connect MetaMask
let web3;
let contract;
let currentAccount;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        // MetaMask is available
        web3 = new Web3(window.ethereum);
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount = web3.eth.accounts[0];
            document.getElementById('connectWalletButton').innerText = "Wallet Connected";
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        alert('Please install MetaMask!');
    }
});

// Fetch the ABI from abi.json and initialize the contract
async function getABI() {
    const response = await fetch('abi/abi.json'); // Assuming the ABI file is in the abi folder
    const abi = await response.json();
    return abi;
}

async function init() {
    const abi = await getABI();
    const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your actual contract address
    contract = new web3.eth.Contract(abi, contractAddress);
    console.log("Contract initialized:", contract);
}

// Connect to MetaMask and set up event listeners
document.getElementById('connectWalletButton').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount = window.ethereum.selectedAddress;
            document.getElementById('connectWalletButton').innerText = "Wallet Connected";
            await init(); // Initialize contract after connecting MetaMask
        } catch (error) {
            console.error("Failed to connect wallet", error);
        }
    } else {
        alert('Please install MetaMask!');
    }
});

// Create a new Tic-Tac-Toe game
document.getElementById('createGameButton').addEventListener('click', async () => {
    const betAmount = prompt("Enter your bet amount in ETH:");
    const valueInWei = web3.utils.toWei(betAmount, 'ether');
    await contract.methods.createGame().send({ from: currentAccount, value: valueInWei });
    console.log("Game created!");
});

// Join an existing Tic-Tac-Toe game
document.getElementById('joinGameButton').addEventListener('click', async () => {
    const gameId = prompt("Enter Game ID to join:");
    const betAmount = prompt("Enter your bet amount in ETH:");
    const valueInWei = web3.utils.toWei(betAmount, 'ether');
    await contract.methods.joinGame(gameId).send({ from: currentAccount, value: valueInWei });
    console.log("Joined game!");
});

// Handle player moves
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', async (event) => {
        const index = event.target.getAttribute('data-index');
        const gameId = prompt("Enter Game ID to make a move:");
        await contract.methods.makeMove(gameId, index).send({ from: currentAccount });
        console.log("Move made!");
        updateBoard(); // Update the game board after making a move
    });
});

// Update the Tic-Tac-Toe board with the current game state
async function updateBoard() {
    const gameId = prompt("Enter Game ID to view game state:");
    const gameState = await contract.methods.getGameState(gameId).call();
    
    document.querySelectorAll('.cell').forEach((cell, index) => {
        const state = gameState[index];
        if (state === "1") {
            cell.innerText = "X";
        } else if (state === "2") {
            cell.innerText = "O";
        }
    });
}

// Function to celebrate the winner
function celebrateWinner(winningCells) {
    winningCells.forEach(index => {
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.classList.add('winner-animation');
    });
}
