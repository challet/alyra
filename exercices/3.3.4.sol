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

    function ajouterTacTic() public {
        tac = new Pulsation("tac");
        tic = new Pulsation("tic");
    }

    function mouvementsBalancier(uint k) public {
        string memory resultat;
        if (bit = !bit) {
            resultat = tic.ajouterBattement();
        } else {
            resultat = tac.ajouterBattement();
            k--;
        }
        balancier.push(resultat);
        if(k != 0) {
            mouvementsBalancier(k);
        }
    }

}