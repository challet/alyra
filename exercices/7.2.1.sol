pragma solidity ^0.5.9;

interface ObjetsMagiquesInterface {
    event Transfer(address indexed _from, address indexed _to, uint256 tokenID);

    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenID) external view returns (address);
    function exists(uint256 tokenID) external view returns (bool);

    function transferFrom(address from, address to, uint256) external;
    function creuser() payable external;
    function utiliser(uint256 tokenID) external returns (uint256);
}

contract ObjetsMagiques is ObjetsMagiquesInterface {
    
    constructor() public {
        owner = msg.sender;
    }
    
    event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
    event Creation(address indexed _to, uint256 _tokenId);
    event Destruction(address indexed _from, uint256 _tokenId);

    address owner;
    // les objets vont de 0000 à 2999
    mapping (uint256 => address) proprietaires;
    mapping (address => uint) comptes;
    
    function balanceOf(address _owner) public view returns (uint256) {
        return comptes[_owner];
    }
    
    function ownerOf(uint256 _tokenId) public view returns (address) {
        require(exists(_tokenId), "L'objet n'existe pas");
        return proprietaires[_tokenId];
    }
    
    function exists(uint256 _tokenId) public view returns (bool) {
        return proprietaires[_tokenId] != address(0);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public {
        require(msg.sender == owner || msg.sender == _from, "Transfert non autorisé");
        require(exists(_tokenId), "L'objet n'existe pas");
        require(proprietaires[_tokenId] == _from, "Mauvais propriétaire");
        require(_tokenId / 1000 != 2, "Objet niveau 2 non transférable");
        comptes[_from]--;
        proprietaires[_tokenId] = _to;
        comptes[_to]++;
        emit Transfer(_from, _to, _tokenId);
    }
    
    function transfer(address _to, uint256 _tokenId) public {
        transferFrom(msg.sender, _to, _tokenId);
    }
    
    function creuser() payable public {
        require(msg.value >= 0.1 ether, "Prix 0.1 ether");
        uint rarete = uint(blockhash(block.number - 1)) % 3;
        uint model =  uint(blockhash(block.number - 1)) % 1000;
        uint _tokenId = rarete * 1000 + model;
        
        require(!exists(_tokenId), "Erreur de création d'objet");
        proprietaires[_tokenId] = msg.sender;
        comptes[msg.sender]++;
        
        emit Creation(msg.sender, _tokenId);
    }
    
    function utiliser(uint _tokenId) public returns (uint256){
        require(exists(_tokenId), "L'objet n'existe pas");
        require(proprietaires[_tokenId] == msg.sender, "Mauvais propriétaire");
        uint resultat = uint(blockhash(block.number - 1)) % 10;
        
        if (resultat == 0) {
            proprietaires[_tokenId] = address(0);
            comptes[msg.sender]--;
            emit Destruction(msg.sender, _tokenId);
        }
        return resultat;
    }
    
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
    mapping (uint256 => Enchere) encheres;
    
    function proposerALaVente(uint256 objet) public {
        require(contratObjets.ownerOf(objet) == address(this), "La propriété doit avoir été transmise.");
        require(encheres[objet].objet == 0, "Cet objet est déjà en vente");
        // /!\ Comment vérifier que le propriétaire précédent (celui qui a transmis la propriété) est le même que msg.sender ?
        encheres[objet] = Enchere(address(0), 0, block.number + 1000, objet, msg.sender);
    }
    
}