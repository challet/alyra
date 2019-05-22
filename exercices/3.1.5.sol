pragma solidity ^0.5.7;

contract Assemblee {
    struct Decision {
        string description;
        uint votesPour;
        uint votesContre;
        uint dateDebut;
        bool active;
        mapping (address => bool) aVote;
    }
    
    Decision[] decisions;
    mapping (address => bool) membres;
    mapping (address => bool) admins;
    string public nomAssemblee;

    constructor(string memory nom) public {
        nomAssemblee = nom;
        // le créateur du contrat est membre et admin
        membres[msg.sender] = true;
        admins[msg.sender]  = true;
    }
    
    function rejoindre() public {
        membres[msg.sender] = true;
    }
    
    function proposerDecision(string memory description) public returns (uint) {
        require(membres[msg.sender], "Il faut être membre!");
        // ajouter une nouvelle décision à la liste
        decisions.push(Decision({ description: description, votesPour: 0, votesContre: 0, dateDebut: now, active: true }));
        // retourner l'identifiant de cette nouvelle décision
        return decisions.length - 1;
    }
    
    function trouverDecision(uint index) internal view returns (Decision storage) {
        require(index < decisions.length && decisions[index].active, "La décision n'existe pas.");
        return decisions[index];
    }
    
    function voter(uint index, bool sens) public {
        Decision storage decision = trouverDecision(index);
        
        require(membres[msg.sender], "Il faut être membre!");
        require(decision.dateDebut > now - 604800, "La décision a éxpiré");
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
    
    function nommerAdmin(address utilisateur) public {
        require(admins[msg.sender], "Il faut être admin !");
        require(membres[msg.sender], "Le nouvel admin doit déjà être membre");
        admins[utilisateur] = true;
    }
    
    function demissionerAdmin() public {
        require(admins[msg.sender], "Il faut être admin !");
        admins[msg.sender] = false;
    }
    
    function fermerDecision(uint index) public {
        require(admins[msg.sender], "Il faut être admin !");
        Decision storage decision = trouverDecision(index);
        decision.active = false;
    }
    
}
