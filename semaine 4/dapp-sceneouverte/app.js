let user = {}
let dapp = {}

function ajouterArtiste() {
  let artiste = document.getElementById("nomartiste").value;
  dapp.ContratSigner.sInscrire(artiste);
}

function artisteSuivant() {
  dapp.ContratSigner.passerArtisteSuivant();
}

async function afficherCreneauxLibres() {
  document.getElementById('Creneaux').innerHTML = await dapp.Contrat.creneauxLibres();
}

async function afficherArtisteEnCours() {
  console.log('afficher artiste');
  document.getElementById('current_artist').innerHTML = await dapp.ContratSigner.artisteEnCours();
}

async function passagesArtistes() {
  let passges = await dapp.ContratSigner.passagesArtistes();
  console.log(passages);
}

async function connectMetamask() {
  try {
    const addresses = await ethereum.enable()
    user.address = addresses[0]

    const provider = new ethers.providers.Web3Provider(ethereum)
    let Contrat=new ethers.Contract(contractAddress, contractABI, provider)
    let ContratSigner=Contrat.connect(provider.getSigner(user.address))
    
    dapp = { provider, Contrat, ContratSigner}

    console.log("DApp ready: ", dapp)
    console.log("User ready: ", user)

    return Promise.resolve(dapp);
  } catch (e) {
    return Promise.reject(e);
  }

}

connectMetamask().then(async () => {
  
  dapp.provider.getNetwork().then( ntw => {
    document.getElementById("Network").innerHTML = JSON.stringify(ntw);
    console.log(ntw)
  })
  
  setInterval(() => {
    afficherCreneauxLibres();
    afficherArtisteEnCours();
  }, 1000);
  
});
