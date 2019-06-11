pragma solidity ^0.5.9;

contract ObjetsMagiques {
    struct Objet {
        string description;
    }
    event Transfer(address indexed _from, address indexed _to, uint _tokenId);
    event Creation(address indexed _to, uint _tokenId);
    event Destruction(address indexed _from, uint _tokenId);

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
        require(_tokenId / 1000 != 2, "Objet niveau 2 non transférable");
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
        uint _tokenId = rarete * 1000 + model;
        
        require(!exists(_tokenId), "Erreur de création d'objet");
        proprietaires[_tokenId] = msg.sender;
        comptes[msg.sender]++;
        
        emit Creation(msg.sender, _tokenId);
        return _tokenId;
    }
    
    function utiliser(uint _tokenId) public returns (uint){
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