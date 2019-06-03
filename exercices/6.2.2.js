 /**
 * Transaction deplacement
 * @param {fr.laposte.Deplacement} tx
 * @transaction
 */
async function deplacement(tx) {
  tx.colis.localisation = tx.arrivee;
  const registre = await getAssetRegistry('fr.laposte.Colis');
  await registre.update(tx.colis);
}

 /**
 * Transaction changerEtat
 * @param {fr.laposte.ChangerEtat} tx
 * @transaction
 */
async function changerEtat(tx) {
  if (tx.etat == "Bon") {
    throw new Error('Changement incohérent');
  }
  
  if (tx.colis.etat == 'Détruit') {
    throw new Error('Déjà signalé comme détruit');
  }
  
  if (tx.colis.etat == 'Endommagé' && tx.etat != "Détruit") {
    throw new Error('Déjà signalé comme endommagé');
  }
  
  if (tx.cause == "") {
    throw new Error('Renseignez une cause');
  }
  
  tx.colis.etat = tx.etat;
  tx.colis.etatRaisons.push(tx.cause);
  
  const registre = await getAssetRegistry('fr.laposte.Colis');
  await registre.update(tx.colis);
}