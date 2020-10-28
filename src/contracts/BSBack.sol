pragma solidity ^0.5.0;

import "./DaiToken.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BSBack {
    string public name = "BS Backend";
    address public admin;
    DaiToken public daiToken;
    // address constant DAI = 0x6b175474e89094c44da98b954eedeac495271d0f;


    struct Player {
        address payable wallet;
        string username;
        string password;
        uint kills;
        uint deaths;
        uint balance;
    }
    
    mapping(address => Player) internal players;

    constructor(DaiToken _daiToken) public {
        admin = msg.sender;
        daiToken = _daiToken;
    }
    
    modifier onlyAdmin() {
        // Only owner can call this function
        require(msg.sender == admin, "caller must be the owner");
        _;
    }

    function addUser(string calldata _username) external {
        players[msg.sender].username = _username;
        players[msg.sender].kills = 0;
        players[msg.sender].deaths = 0;
        players[msg.sender].balance = 0;
    }

    function buyCoins(uint _amount) external {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Trasnfer Mock Dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        players[msg.sender].balance += _amount;
    }

    // Unstaking Tokens (Withdraw)
    function sellCoins(uint _amount) external {
        // Fetch staking balance
        uint balance = players[msg.sender].balance;

        // Require amount greater than 0
        require(balance > _amount, "Cannot sell more coins than owned");

        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transfer(msg.sender, _amount);

        // Reset staking balance
        players[msg.sender].balance = balance - _amount;
    }

    function playGame(address _account, uint _cost) external  {
        uint balance = players[_account].balance;
        require(balance > _cost, "Not enough coins to play");
        players[_account].balance = balance - _cost;
    }

    function collectWinnings(address _account, uint _amount) external onlyAdmin() {
        players[_account].balance += _amount;
    }

    function getUsername(address _account) external returns(string memory){
        return players[_account].username;
    }

    function getBalance(address _account) external returns(uint){
        players[msg.sender].balance = 0;
    }

    function getKills(address _account) external returns(uint){
        players[msg.sender].kills = 0;
    }

    function getDeaths(address _account) external returns(uint){
        players[msg.sender].deaths = 0;
    }
}