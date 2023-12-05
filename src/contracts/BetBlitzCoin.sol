// SPDX-License-Identifier: MITX
pragma solidity 0.8.19;

contract BetBlitzCoin {
    address owner;
    uint256 id;
    mapping(uint256 => Bet) public bets;

    constructor() {
        owner = msg.sender;
        id = 0;
    }

    struct Bet {
        uint256 id;
        address p1;
        address p2;
        uint256 price;
        uint8 bet;
        uint8 result;
        bool closed;
    }

    modifier onlyOwner () {
        require(msg.sender == owner,"Only owner can send this request");
        _;
    }

    function createBet(uint8 _bet) payable external {
        require(msg.value > 0, "Bet price should be greater than 0");
        id = id + 1;

        Bet memory bet = Bet({
            id: id,
            p1: msg.sender,
            price:msg.value,
            bet: _bet,
            result: 99,
            p2: address(0),
            closed: false
        });

        bets[id] = bet;
    }

    function closeBet(uint8 _result, uint256 _id) external payable {
        Bet storage bet = bets[_id];
        require(bet.closed == false, "Bet has ended");
        require(msg.value >= bet.price, "Please send the bet amount!");

        bet.result = _result;
        bet.p2 = msg.sender;
        bet.closed = true;
        
        if (bet.result == bet.bet) {
            (bool sent,) = bet.p1.call{value: bet.price * 2}("");
            require(sent, "BetBlitzDice: Amount not sent to P1.");
        } else {
            (bool sent,) = bet.p2.call{value: bet.price * 2}("");
            require(sent, "BetBlitzDice: Amount not sent to P1.");
        }
    }
}