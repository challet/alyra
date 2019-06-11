pragma solidity ^0.5.9;

interface ObjetsMagiquesInterface {
    event Transfer(address indexed _from, address indexed _to, uint256 tokenID);

    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenID) external view returns (address);
    function exists(uint256 tokenID) external view returns (bool);

    function transferFrom(address from, address to, uint256 _tokenId) external;
    function transfer(address _to, uint256 _tokenId) external;
    function creuser() payable external;
    function utiliser(uint256 tokenID) external returns (uint256);
}

contract PlaceDeMarche {
    
    constructor(address _contratObjets) public {
        owner = msg.sender;
        contratObjets = ObjetsMagiquesInterface(_contratObjets);
    }
    
    struct Enchere {
        address meilleurAcheteur;
        uint256 meilleureOffre;
        uint256 finEnchere;
        uint256 objet;
        address vendeur;
    }
    
    address owner;
    ObjetsMagiquesInterface contratObjets;
    mapping (uint256 => Enchere) public encheres;
    mapping (address => uint256) remboursements;
    
    function proposerALaVente(uint256 objet) public {
        require(contratObjets.ownerOf(objet) == address(this), "La propriété doit avoir été transmise.");
        require(encheres[objet].objet == 0, "Cet objet est déjà en vente");
        // /!\ Comment vérifier que le propriétaire précédent (celui qui a transmis la propriété) est le même que msg.sender ?
        encheres[objet] = Enchere(address(0), 0, block.number + 1000, objet, msg.sender);
    }
    
    function offre(uint256 objet) payable public {
        require(encheres[objet].objet != 0, "Cet objet n'est pas en vente");
        require(encheres[objet].finEnchere >= block.number, "La vente est terminée");
        require(encheres[objet].meilleureOffre < msg.value, "Une meilleure offre ou égale existe déjà");
        
        // retirer l'ancien meilleur acheteur et le rembourser
        if (encheres[objet].meilleurAcheteur != address(0)) {
            remboursements[encheres[objet].meilleurAcheteur] += encheres[objet].meilleureOffre;
        }
        // ajouter le nouveau
        encheres[objet].meilleurAcheteur = msg.sender;
        encheres[objet].meilleureOffre = msg.value;
        
    }
    
    function recupererObjet(uint objet) public {
        require(encheres[objet].finEnchere < block.number, "La vente est encore en cours");
        require(encheres[objet].meilleurAcheteur == msg.sender, "Réserver à l'acquéreur");
        
        // rembourser le vendeur
        remboursements[encheres[objet].vendeur] += encheres[objet].meilleureOffre;
        // transférer l'objet à l'acheteur
        contratObjets.transfer(encheres[objet].meilleurAcheteur, objet);
    }
    
    function remboursement() public {
        require(remboursements[msg.sender] != 0, "Aucun remboursement en attente");
        remboursements[msg.sender] = 0;
        msg.sender.transfer(remboursements[msg.sender]);
    }
    
}