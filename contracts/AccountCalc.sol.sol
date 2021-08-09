//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract AccountCalc is ChainlinkClient {
 
  address private immutable oracle;
  bytes32 private immutable jobId;
  uint256 private immutable fee;

  uint256 public sumBalances;
  address public highestBalance;
  address public lowestBalance;

  event RequestSumBalances(bytes32 indexed requestId, uint256 indexed sum);
  event RequestSmallestBalance(bytes32 indexed requestId, address indexed _address);
  event RequestHighestBalance(bytes32 indexed requestId, address indexed _address);

  constructor(string _jobId, address _oracle, uint256 _fee) public {
    setPublicChainlinkToken();
    jobId = _jobId;
    oracle = _oracle;
    fee = _fee;
  }

  function requestSumBalances() public {
     Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(jobId), address(this), this.fulfillSumBalances.selector);
     req.add("endpoint", "sum-balances");
     req.add("copyPath", "answer");
     sendChainlinkRequestTo(oracle, req, fee);
  }

  function fulfillSumBalances(bytes32 _requestId, uint256 _sum) public recordChainlinkFulfillment(_requestId) {
    sumBalances = _sum;
    emit RequestSumBalances(_requestId, _sum);
  }

  function fulfillSmallestBalance(bytes32 _requestId, address _lowestBalance) public recordChainlinkFulfillment(_requestId) {
    lowestBalance = _lowestBalance;
    emit RequestSmallestBalance(_requestId, _lowestBalance);
  }

   function fulfillHighestBalance(bytes32 _requestId, address _highestBalance) public recordChainlinkFulfillment(_requestId) {
    highestBalance = _highestBalance;
    emit RequestHighestBalance(_requestId, _highestBalance);
  }


  // utility functions
  function stringToBytes32(string memory source) private pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }

    assembly { // solhint-disable-line no-inline-assembly
      result := mload(add(source, 32))
    }
  }
}
