pragma solidity ^0.5.7;

contract Cogere {

    mapping (address => uint) organisateurs;

    constructor() internal {
        organisateurs[msg.sender] = 100;
    }

    function transfererOrga(address orga, uint parts) public {
        require(parts <= organisateurs[msg.sender], "Fonds insufisant pour effectuer le transfert");
        organisateurs[msg.sender] -= parts;
        organisateurs[orga] += parts;
    }
    
    function estOrga(address orga) public view returns (bool) {
        return organisateurs[orga] != 0;
    }
}

contract CagnotteFestival is Cogere {
    
    uint private depensesTotales;
    uint public placesRestantes;
    mapping (address => bool) festivaliers;
    string[] public sponsors;
    
    // le constructeur parent semble être appellé automatiquement
    // https://solidity.readthedocs.io/en/develop/contracts.html#arguments-for-base-constructors
    constructor(uint places) public {
        placesRestantes = places;
    }

    function comptabiliserDepense(uint montant) private {
        depensesTotales += montant;
    }
    
    function acheterTicket() public payable {
        require(msg.value >= 500 finney, "Place à 0.5 Ethers");
        require(placesRestantes > 0, "Plus de places !");
        // enregistrer l'acheteur
        festivaliers[msg.sender] = true;
        // mettre à jour la disponibilité
        placesRestantes--;
    }
    
    function payer(address payable destinataire, uint montant) public {
        require(estOrga(msg.sender), "Réservé aux administrateurs");
        require(destinataire != address(0), "Un destinataire est requis");
        require(montant > 0, "Un montant est requis");
        // envoyer le montant
        destinataire.transfer(montant);
        // enregistrer la dépense
        comptabiliserDepense(montant);
    }
    
    function sponsoriser(string memory nom) public payable {
        require(msg.value >= 30 ether, "Sponsoring à 30 Ethers");
        // enregistrer le sponsor
        sponsors.push(nom);
    }
    
    // paiements et dons anonymes
    function () external payable {
    }
    
}
