/* api-hal.js */

/*
* Fonctions utilisateur
*/

// supprimer le contenu d'un champ
// et rendre l'aide en ligne visible
function eraseField(e) {
  nbPublisHelp.classList.add('invisible');
  e.target.value = '';
}

// récupérer le nb de publis d'un idHal via API HAL
function getNbPublis(e) {

  // config
  const IdHAL = e.target.value;
  const baseUrl = 'https://api.archives-ouvertes.fr/search/';
  const query = `?q=authIdHal_s:${IdHAL}`;

  // interroger l'API
  fetch(baseUrl + query).then(response => {
    // si ok…
    if (response.ok) {
      // … interpréter au format JSON
      return response.json();
    }
  })
  .then(data => {
    // enregistrer la donnée
    const numFound = data.response.numFound;
    // insérer le nb de publis dans le champ ad hoc
    nbPublis.innerHTML = numFound;
    // si le résultat est égal à 0
    if (numFound == 0) {
      // le champ d'aide est rendu visible
      nbPublisHelp.classList.remove('invisible');
      // on lance une exception : peut-être un problème de saisie ?
      throw new Error(`Aucun résultat trouvé pour l’IdHAL ${IdHAL}.`);
    }
  })
  .catch(error => {
    // afficher l'erreur dans la console
    console.error(error.message);
  });

}

function run() {

  // récupérer les éléments
  const nbPublis = document.getElementById('nbPublis');
  const nbPublisHelp = document.getElementById('nbPublisHelp');
  const idHal = document.getElementById('IdHAL');

  // gestionnaire d'événements
  idHal.addEventListener('click', eraseField);
  idHal.addEventListener('change', getNbPublis);

};

// au chargement de la page, lancer le script
window.addEventListener('load', run);
