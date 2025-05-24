// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

import "./FearAndGreedIndexConsumer.sol";

contract Contract2 is FearAndGreedIndexConsumer {
    uint256 public interestRate = 5;

    event InterestChanged(uint256 newInterest);

    function changeInterest(uint256 _num) public {
        interestRate = _num;
    }

    function retrieve() public view returns (uint256) {
        return interestRate;
    }

    receive() external payable {}
}
