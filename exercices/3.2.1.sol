pragma solidity ^0.5.7;

contract CagnotteFestival {

    mapping (address => uint) organisateurs;

    constructor() public {
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
