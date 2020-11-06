pragma solidity ^0.5.0;

import "./DaiToken.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BSBack {
    string public name = "BS Backend";
    DaiToken public daiToken;
    // address constant DAI = 0x6b175474e89094c44da98b954eedeac495271d0f;

    address admin;
    string[] allPlayers;

    struct Player {
        address payable wallet;
        string username;
        string password;
        uint256 balance;
        bool playing;
    }
    
    mapping(string => Player) internal players;

    constructor(DaiToken _daiToken) public {
        admin = msg.sender;
        daiToken = _daiToken;
    }
    
    modifier onlyAdmin() {
        // Only owner can call this function
        require(msg.sender == admin, "caller must be the owner");
        _;
    }

    function addUser(string calldata _username,string calldata _password) external {
        players[_username].wallet = address(msg.sender);
        players[_username].username = _username;
        players[_username].password = _password;
        players[_username].balance = 0;
        players[_username].playing = false;
    }

    function buyCoins(string calldata _username, uint256 _amount) external {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        uint256 weiAmount = _amount * 1000000000000000000;

        // Trasnfer Mock Dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), weiAmount);

        // Update staking balance
        players[_username].balance += _amount;
    }

    // Unstaking Tokens (Withdraw)
    function sellCoins(string calldata _username, uint256 _amount) external {
        // Fetch staking balance
        uint balance = players[_username].balance;

        // Require amount greater than 0
        require(balance >= _amount, "Cannot sell more coins than owned");

        uint256 weiAmount = _amount * 1000000000000000000;

        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transfer(msg.sender, weiAmount);

        // Reset staking balance
        players[_username].balance = balance - _amount;
    }

    function playGame(string calldata _username, uint _cost) external onlyAdmin() {
        uint balance = players[_username].balance;
        require(balance > _cost, "Not enough coins to play");
        players[_username].balance = balance - _cost;
        players[_username].playing = true;
    }

    function collectWinnings(string calldata _username, uint _amount) external onlyAdmin() {
        players[_username].balance += _amount;
        players[_username].playing = false;
    }

    function getUsername(string calldata _username) external view returns(string memory){
        return players[_username].username;
    }

    function getPass(string calldata _username) external view returns(string memory){
        return players[_username].password;
    }

    function setPass(string calldata _username, string calldata _pass) external onlyAdmin() {
        players[_username].password = _pass;
    }

    function getBalance(string calldata _username) external view returns(uint){
        return players[_username].balance;
    }

    function getPlaying(string calldata _username) external view returns(bool){
        return players[_username].playing;
    }
    
    function checkPlayer(string calldata _username) external view returns(bool){
        return players[_username].playing;
    }
}
