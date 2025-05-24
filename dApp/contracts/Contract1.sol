// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

contract Contract1 {
    uint256 public interestRate = 3;

    event InterestChanged(uint256 newInterest);

    function changeInterest(uint256 _num) public {
        interestRate = _num;
    }

    receive() external payable {}
}
