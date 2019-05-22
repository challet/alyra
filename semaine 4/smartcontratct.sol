pragma solidity ^0.5.5;

contract JetonMinimal {

  mapping (address => uint256) public comptes;
  
  constructor(uint256 nombreInitial) public {
    comptes[msg.sender] = nombreInitial;
  }
  
  function transfer(address destinataire, uint256 valeur) public {
    require(comptes[msg.sender] >= valeur);
    comptes[msg.sender] -= valeur;
    comptes[destinataire] += valeur;
  }

}