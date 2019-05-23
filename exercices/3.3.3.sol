pragma solidity ^0.5.7;

contract Pulsation {
    
    string private message;

    constructor(string memory messagearg) public {
        message = messagearg;
    }

    function ajouterBattement() public view returns (string memory) {
        return message;
    }
    
}

contract Pendule {
    
    string[] public balancier;
    bool bit = false;
    Pulsation tac;
    Pulsation tic;

    function ajouterTacTic(Pulsation _tic, Pulsation _tac) public {
        tac = _tac;
        tic = _tic;
    }

    function mouvementsBalancier() public {
        string memory resultat;
        if (bit = !bit) {
            resultat = tac.ajouterBattement();
        } else {
            resultat = tic.ajouterBattement();
        }
        balancier.push(resultat);
    }

}