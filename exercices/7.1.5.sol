pragma solidity ^0.5.9;

contract ObjetsMagiques {
    struct Objet {
        string description;
    }
    event Transfer(address indexed _from, address indexed _to, uint _tokenId);
    event Creation(address indexed _to, uint _tokenId);

    address owner;
    // les objets vont de 0000 à 2999
    mapping (uint => address) proprietaires;
    mapping (address => uint) comptes;
    
    constructor() public {
        owner = msg.sender;
    }
    
    function balanceOf(address _owner) public view returns (uint) {
        return comptes[_owner];
    }
    
    function ownerOf(uint _tokenId) public view returns (address) {
        require(exists(_tokenId), "L'objet n'existe pas");
        return proprietaires[_tokenId];
    }
    
    function exists(uint _tokenId) public view returns (bool) {
        return proprietaires[_tokenId] != address(0);
    }

    function transferFrom(address _from, address _to, uint _tokenId) public {
        require(msg.sender == owner || msg.sender == _from, "Transfert non autorisé");
        require(exists(_tokenId), "L'objet n'existe pas");
        require(proprietaires[_tokenId] == _from, "Mauvais propriétaire");
        comptes[_from]--;
        proprietaires[_tokenId] = _to;
        comptes[_to]++;
        emit Transfer(_from, _to, _tokenId);
    }
    
    function transfer(address _to, uint _tokenId) public {
        transferFrom(msg.sender, _to, _tokenId);
    }
    
    function creuser() payable public returns (uint) {
        require(msg.value >= 0.1 ether, "Prix 0.1 ether");
        uint rarete = uint(blockhash(block.number - 1)) % 3;
        uint model =  uint(blockhash(block.number - 1)) % 1000;
        uint id = rarete * 1000 + model;
        
        require(!exists(id), "Erreur de création d'objet");
        proprietaires[id] = msg.sender;
        comptes[msg.sender]++;
        
        emit Creation(msg.sender, id);
        return id;
    }
    
}