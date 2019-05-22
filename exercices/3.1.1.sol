pragma solidity ^0.4.25;
contract SceneOuverte {

  string[12] passagesArtistes;  
  uint public creneauxLibres = 12;
  uint public tour = 0;

  function sInscrire(string nomDArtiste) public {
    if (creneauxLibres > 0) {
      passagesArtistes[12-creneauxLibres] = nomDArtiste;
      creneauxLibres -= 1;
    }
  }

  function passerArtisteSuivant() public {
    if(tour < 12) {
      tour += 1;
    }
  }

  function artisteEnCours () public constant returns (string) {
    if (tour < 12 - creneauxLibres) {
      return passagesArtistes[tour];
    } else {
      return "FIN";
    }
  }
}