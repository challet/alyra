pragma solidity ^0.5.7;
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Cogere {
    
    uint partsTotal;
    mapping (address => uint) organisateurs;

    constructor() internal {
        organisateurs[msg.sender] = 100;
        partsTotal = 100;
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
        
    using SafeMath for uint256;
    
    uint public placesRestantes;
    uint public dateFestival;
    uint private depensesTotales;
    uint private recettesTotales;
    uint private dateLiquidation;
    
    mapping (address => bool) festivaliers;
    string[] public sponsors;
    
    constructor(uint places, uint date) public {
        placesRestantes = places;
        dateFestival = date;
        dateLiquidation = dateFestival + 2 weeks; 
    }

    function comptabiliserDepense(uint montant) private {
        depensesTotales = SafeMath.add(depensesTotales, montant);
    }
    
    function comptabiliserRecette(uint montant) private {
        recettesTotales = SafeMath.add(recettesTotales, montant);
    }
    
    function voirDepenses() view public returns (uint) {
        require(estOrga(msg.sender), "Réservé aux administrateurs");
        return depensesTotales;
    }
    
    function voirRecettes() view public returns (uint) {
        require(estOrga(msg.sender), "Réservé aux administrateurs");
        return depensesTotales;
    }
    
    function voirSolde() view public returns (uint) {
        require(estOrga(msg.sender), "Réservé aux administrateurs");
        return recettesTotales - depensesTotales;
    }
    
    function acheterTicket() public payable {
        require(msg.value >= 500 finney, "Place à 0.5 Ethers");
        require(placesRestantes > 0, "Plus de places !");
        // enregistrer l'acheteur
        festivaliers[msg.sender] = true;
        // enregistrer la recette
        comptabiliserRecette(msg.value);
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
        // enregistrer la recette
        comptabiliserRecette(msg.value);
    }
    
    function retrait() public {
        require(estOrga(msg.sender), "Réservé aux administrateurs");
        require(block.timestamp > dateLiquidation, "Date de liquidation pas encore passée");
        
        // calculer les fonds revenant à cet organisateur
        uint fonds = voirSolde() * organisateurs[msg.sender] / 100;
        // lui envoyer
        payer(msg.sender, fonds);
        // décompter ses parts du total
        partsTotal -= organisateurs[msg.sender];
        // et lui retirer ses parts
        organisateurs[msg.sender] = 0;
        
        // fermer le contrat
        if (partsTotal == 0) {
            selfdestruct(msg.sender);
        }
    }
    
    // paiements et dons anonymes
    function () external payable {
        // enregistrer la recette
        comptabiliserRecette(msg.value);
    }
    
}
