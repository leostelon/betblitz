// SPDX-License-Identifier: MITX
pragma solidity 0.8.19;

contract BetBlitz {
    address owner;
    mapping(uint256 => mapping(address => bool)) public questions;
    mapping(uint256 => address[]) public usersPerQuestion;
    mapping(uint256 => uint256) public questionPrice;
    mapping(uint256 => bool) public questionExist;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner () {
        require(msg.sender == owner,"Only owner can send this request");
        _;
    }

    function createQuestion(uint256 _id, uint256 _amount) external {
        questionPrice[_id] = _amount;
        questionExist[_id] = true;
    }

    function createVote(uint256 _id, bool _response) payable external {
        require(questionExist[_id], "Bet on valid question!");
        require(msg.value >= questionPrice[_id], "Please send the required bet for this question");
        usersPerQuestion[_id].push(msg.sender);
        questions[_id][msg.sender] = _response;
    }
    
    function closeQuestion(uint256 _id, bool _finalResponse) payable external onlyOwner {
        uint256 totalRecipients = 0;
        for(uint256 i = 0; i < usersPerQuestion[_id].length; i++) {
            if(questions[_id][usersPerQuestion[_id][i]] == _finalResponse) {
                totalRecipients = totalRecipients + 1;
            }
        }
        if(totalRecipients == 0 ) {
            totalRecipients = 1;
        }
        uint256 amountPerRecipient = (questionPrice[_id] * usersPerQuestion[_id].length) / totalRecipients;

        for(uint256 i = 0; i < usersPerQuestion[_id].length; i++) {
            if(questions[_id][usersPerQuestion[_id][i]] == _finalResponse) {
                (bool sent,) = usersPerQuestion[_id][i].call{value: amountPerRecipient}("");
                require(sent, "BetBlitz: Amount not sent.");
            }
        }
    }

}