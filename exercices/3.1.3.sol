pragma solidity ^0.5.7;
contract Assemblee {
    address[] membres;
    string[] descriptionDecisions;
    uint[] votesPour;
    uint[] votesContre;
    
    function rejoindre() public {
        membres.push(msg.sender);
    }
 
    function estMembre(address utilisateur) public view returns (bool) {
        for (uint i=0; i < membres.length; i++) {
            if (membres[i] == utilisateur) {
                return true;
            }
        }
        return false;
    }
    
    function proposerDecision(string memory description) public {
        if (estMembre(msg.sender)) {
            descriptionDecisions.push(description);
            votesPour.push(0);
            votesContre.push(0);
        }
    }
    
    function voter(uint vote, bool sens) public {
        if (estMembre(msg.sender)) {
            if (sens) {
                votesPour[vote]++;
            } else {
                votesContre[vote]++;
            }
        }
    }

    function comptabiliser(uint vote) public view returns (int) {
        return int(votesPour[vote]) - int(votesContre[vote]);
    }
    
}
