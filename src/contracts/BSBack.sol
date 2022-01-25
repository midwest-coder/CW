// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SBTransfers {
    string public name = "SB Transfers";

    address payable admin;

    constructor() {
        admin = payable(msg.sender);
    }
    
    modifier onlyAdmin() {
        // Only owner can call this function
        require(msg.sender == admin, "caller must be the owner");
        _;
    }

    function purchaseTokens(address _token, uint256 _amount) external {
        ERC20(_token).transferFrom(address(msg.sender), address(this), _amount);
        // transerFee(_token, _fee);
    }
    
    function transerFee(address _token, uint256 _fee) internal {
        ERC20(_token).transfer(admin, _fee);
    }

    function sellTokens(address _token, address _account, uint256 _amount) external onlyAdmin() {
        ERC20(_token).transfer(address(_account), _amount);
    }
    
    function checkBalance(address _token) external view returns (uint256 balance) {
        return ERC20(_token).balanceOf(address(this));
    }
    
    function changeAdmin(address _newAdmin) external onlyAdmin() {
        admin = payable(_newAdmin);
    }

    function recieve() payable external {}
}
