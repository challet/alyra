 /**
 * Transaction deplacement
 * @param {fr.laposte.Transport} tx
 * @transaction
 */
async function transport(tx) {
  tx.colis.localisation = tx.destination;
  const registre = await getAssetRegistry('fr.laposte.Colis');
  await registre.update(tx.colis);
}

 /**
 * Transaction distribution
 * @param {fr.laposte.Distribution} tx
 * @transaction
 */
async function distribution(tx) {
  tx.colis.localisation = tx.colis.destinataire;
  const registre = await getAssetRegistry('fr.laposte.Colis');
  await registre.update(tx.colis);
  
  let event = getFactory().newEvent('fr.laposte', 'DistributionEvent');
  event.colis = tx.colis;
  event.destination = tx.colis.localisation;
  emit(event);
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