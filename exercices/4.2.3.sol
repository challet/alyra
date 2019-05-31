pragma solidity ^0.5.7;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Credibilite {
    
    event Remise(bytes32 devoir, address emetteur);
    
    using SafeMath for uint256;
  
    mapping (address => uint256) public cred;
    bytes32[] private devoirs;
   
    function produireHash(string memory url) pure public returns (bytes32) {
        return keccak256(bytes(url));
    }
    
    function transfer(address destinataire, uint256 valeur) public {
        require(cred[msg.sender] - valeur > 1, "Pas assez de cred disponible (il doit rester au moins 1)");
        require(cred[destinataire] != 0, "Le destinataire doit déjà détenir des creds");
        require(valeur > 0, "Le montant du transfert n'est pas correct");
        // enlever les crédits de l'émetteur avant de les ajouter au destinataire
        cred[msg.sender] = SafeMath.sub(cred[msg.sender], valeur);
        cred[destinataire] = SafeMath.add(cred[destinataire], valeur);
    }
    
    function devoirExiste(bytes32 dev) view private returns (bool) {
        for(uint i = 0; i < devoirs.length; i++) {
            if (devoirs[i] == dev) {
                return true;
            }
        }
        return false;
    }
    
    function remettre(bytes32 dev) public returns (uint) {
        require(!devoirExiste(dev), "Ce devoir a déjà été rendu");
        devoirs.push(dev);
        if(devoirs.length == 1) {
            cred[msg.sender] = SafeMath.add(cred[msg.sender], 30);
        } else if (devoirs.length == 2) {
            cred[msg.sender] = SafeMath.add(cred[msg.sender], 20);
        } else {
            cred[msg.sender] = SafeMath.add(cred[msg.sender], 10);
        }
        
        emit Remise(msg.sender, dev);
        return devoirs.length;
    }
}
