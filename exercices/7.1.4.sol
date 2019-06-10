pragma solidity ^0.5.9;

contract ObjetsMagiques {
    struct Objet {
        string description;
    }
    event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);

    address owner;
    mapping (uint256 => address) proprietaires;
    mapping (address => uint16) comptes;
    uint16[] objets;
    
    constructor() public {
        owner = msg.sender;
    }
    
    function balanceOf(address _owner) public view returns (uint16) {
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
        comptes[_from]--;
        proprietaires[_tokenId] = _to;
        comptes[_to]++;
        emit Transfer(_from, _to, _tokenId);
    }
    
    function transfer(address _to, uint256 _tokenId) public {
        transferFrom(msg.sender, _to, _tokenId);
    }

    function invoque(address _to, uint16 objet) public returns (uint256) {
        require(msg.sender == owner, "Invocation non autorisée");
        require(objet >= 0 && objet <= 9999, "Objet non invocable");
        uint256 id = objets.push(objet) - 1;
        proprietaires[id] = _to;
        comptes[_to]++;
        return id;
    }
}