pragma solidity ^0.5.7;

contract Assemblee {
    struct Decision {
        string description;
        uint votesPour;
        uint votesContre;
        uint dateDebut;
        mapping (address => bool) aVote;
    }
    
    Decision[] decisions;
    address[] membres;
    
    function rejoindre() public {
        membres.push(msg.sender);
    }
 
    function estMembre(address utilisateur) public view returns (bool) {
        for (uint i = 0; i < membres.length; i++) {
            if (membres[i] == utilisateur) {
                return true;
            }
        }
        return false;
    }
    
    function proposerDecision(string memory description) public returns (uint) {
        require(estMembre(msg.sender), "Il faut être membre!");
        // ajouter une nouvelle décision à la liste
        decisions.push(Decision({ description: description, votesPour: 0, votesContre: 0, dateDebut: now }));
        // retourner l'identifiant de cette nouvelle décision
        return decisions.length - 1;
    }
    
    function trouverDecision(uint index) internal view returns (Decision storage) {
        require(index < decisions.length, "Le vote n'existe pas.");
        return decisions[index];
    }
    
    function voter(uint index, bool sens) public {
        Decision storage decision = trouverDecision(index);
        
        require(estMembre(msg.sender), "Il faut être membre!");
        require(decision.dateDebut > now - 604800, "Le vote a éxpiré");
        require(!decision.aVote[msg.sender], "A déjà voté !");
        
        // effetcuer le vote
        if (sens) {
            decision.votesPour++;
        } else {
            decision.votesContre++;
        }
        decision.aVote[msg.sender] = true;
    }

    function comptabiliser(uint index) public view returns (int) {
        // trouver la decision correspondante
        Decision storage decision = decisions[index];
        // calculer le résultat
        return int(decision.votesPour) - int(decision.votesContre);
    }
    
    function voirDecision(uint index) public view returns (string memory) {
        Decision storage decision = trouverDecision(index);
        return decision.description;
    }
    
}
