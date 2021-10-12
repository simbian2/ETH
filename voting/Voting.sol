pragma solidity ^0.8.0;

contract Voting{
    //후보자들 초기화
    string[] public candidateList;
    mapping( string => uint ) public voteReceived;

    constructor(string[] memory _candidateNames) public{
        candidateList = _candidateNames;
    }

    function voteForCandidate(string memory _candidate) public {
        voteReceived[_candidate] += 1;
    }

    function totalVotesFor(string memory _candidate) view public returns(uint){
        return voteReceived[_candidate];
    }

    function validCandidate(string memory _candidate) view public returns(bool){
        for(uint i=0; i<candidateList.length; i++){
            if(keccak256(bytes(candidateList[i])) == keccak256(bytes(_candidate))){
                return true;
            }
        }
        return false;
    }
}
