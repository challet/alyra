pragma solidity ^0.5.7;

contract Pulsation {
    
    uint public battement;
    string private message;

    constructor(string memory messagearg) public {
        battement = 0;
        message = messagearg;
    }

    function ajouterBattement() public returns (string memory) {
        battement++;
        return message;
    }
    
}

contract Pendule  {

    Pulsation pulse;

    function provoquerUnePulsation() public {
        pulse.ajouterBattement();
    }

}