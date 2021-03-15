pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BSBack {
    string public name = "BS Backend";
    // address constant DAI = 0x6b175474e89094c44da98b954eedeac495271d0f;

    address payable admin;

    constructor() public {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        // Only owner can call this function
        require(msg.sender == admin, "caller must be the owner");
        _;
    }

    function deposit(address _token, uint256 _amount) external {
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
    }

    function collect(address _token, address _account, uint256 _amount) external onlyAdmin() {
        IERC20(_token).transfer(address(_account), _amount);
    }

    function recieve() payable external {}
}
