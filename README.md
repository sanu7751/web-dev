Decentralized Tic-Tac-Toe Game
A fully decentralized Tic-Tac-Toe game built on the Ethereum blockchain using Solidity smart contracts, Web3.js, and MetaMask for wallet integration. This project ensures transparent and fair gameplay, allowing players to create or join games with full control over their moves, recorded immutably on the blockchain.
Features
	Decentralized Gameplay: No central authority, all actions are handled by smart contracts.
	Transparency: All moves and game outcomes are recorded on the Ethereum blockchain.
	MetaMask Integration: Secure wallet connection for managing game participation and transactions.
	Real-Time Updates: Game state is updated instantly based on blockchain confirmations.
	Secure and Fair: Smart contract ensures fair play and prevents cheating.
Technology Stack
	Frontend: HTML, CSS, JavaScript
	Blockchain: Ethereum, Solidity (Smart Contracts)
	Web3: Web3.js for blockchain interaction
	Wallet: MetaMask for managing user accounts and signing transactions
	Testing: Ethereum Testnets (Goerli or Sepolia), Ganache (local testing)
Prerequisites
	MetaMask: Install the MetaMask browser extension and create an Ethereum account.
	Test Ether: Ensure you have test Ether from Goerli or Sepolia faucet to cover transaction fees.
	Node.js: Ensure you have Node.js installed for running the frontend.
Installation
	Clone the Repository:
•	git clone https://github.com/your-repo/decentralized-tic-tac-toe.git
•	cd decentralized-tic-tac-toe
	Install Dependencies: Install the necessary Node.js dependencies.
•	npm install
Deploy Smart Contract
	Open Remix IDE.
	Paste the HealthRecords.sol (or your Tic-Tac-Toe contract) into a new file.
	Connect MetaMask to the Goerli or Sepolia testnet.
	Deploy the contract and copy the Contract Address and ABI.
Update Frontend Configuration
	In the app.js file, add your Contract Address and ABI to interact with the deployed contract.

Run the Frontend: 
	Start a local server to run the frontend.
	npm start
Usage
	Connect Wallet: Open the application in your browser and connect MetaMask.
	Create/Join Game: Create a new Tic-Tac-Toe game or join an existing one using the Game ID.
	Make Moves: Players take turns, with each move being recorded on the blockchain.
	Game End: The game ends when a player wins or there is a draw, as determined by the smart contract
Troubleshooting
	Not enough test Ether: Get test Ether from the Goerli faucet or Sepolia faucet.
	MetaMask Issues: Ensure MetaMask is connected to the correct network (Goerli or Sepolia).
	Transaction Errors: Check that you have enough test Ether to cover gas fees and that the smart contract is properly deployed
License
This project is licensed under the MIT License.
