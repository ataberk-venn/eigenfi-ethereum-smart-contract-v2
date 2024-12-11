// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {VennFirewallConsumer} from "@ironblocks/firewall-consumer/contracts/consumers/VennFirewallConsumer.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ERC20Faucet is VennFirewallConsumer {
    IERC20 public token;
    address public owner;
    uint256 public dailyAllowance;

    mapping(address => uint256) public lastClaimed;

    event TokensClaimed(address indexed user, uint256 amount);
    event DailyAllowanceUpdated(uint256 newAllowance);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor(address _token, uint256 _dailyAllowance) {
        token = IERC20(_token);
        owner = msg.sender;
        dailyAllowance = _dailyAllowance;
    }

    function claimTokens() external firewallProtected {
        require(block.timestamp - lastClaimed[msg.sender] >= 1 days, "Can only claim once per day");

        require(token.transfer(msg.sender, dailyAllowance), "Token transfer failed");

        lastClaimed[msg.sender] = block.timestamp;
        emit TokensClaimed(msg.sender, dailyAllowance);
    }

    function setDailyAllowance(uint256 _dailyAllowance) external onlyOwner {
        dailyAllowance = _dailyAllowance;
        emit DailyAllowanceUpdated(_dailyAllowance);
    }

    function withdrawTokens(uint256 amount) external onlyOwner {
        require(token.transfer(owner, amount), "Token transfer failed");
    }
}
