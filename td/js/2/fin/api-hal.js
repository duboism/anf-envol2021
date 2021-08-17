/* api-hal.js */

// config
const config = {
  idHal: '',
  baseUrl: 'https://api.archives-ouvertes.fr/search/',
  query: '',
  nbDocs: 0,
  start: 0
};

/*
* Requête HTTP
*/

// exécute une requête HTTP
async function request() {
  // modification recherche
  config.query = `?q=authIdHal_s:${config.idHal}&start=${config.start}`;
  // attente de la réponse
  const stream = await fetch(config.baseUrl + config.query);
  // aucune erreur HTTP
  if (stream.ok) {
    // envoie réponse au format json
    return stream.json();
  }
}

// affiche les documents
const printDocs = (data) => {
  const docs = data.response.docs;
  const ul = document.createElement('ul');
  for (const doc of docs) {
    const li = document.createElement('li');
    li.innerHTML = doc.label_s;
    ul.appendChild(li);
  }
  documents.innerHTML = '';
  documents.appendChild(ul);
}

// affiche le bloc et le nb de publis
const setNbDocs = (data) => {
  config.nbDocs = data.response.numFound;
  nbPublis.innerHTML = config.nbDocs;
  nbPublisLabel.classList.remove('invisible');
  // si le résultat est égal à 0
  if (config.nbDocs == 0) {
    // le champ d'aide est rendu visible
    nbPublisHelp.classList.remove('invisible');
    // on lance une exception : peut-être un problème de saisie ?
    throw new Error(`Aucun résultat trouvé pour l’IdHAL ${config.idHal}.`);
  }
  return data;
}

// met en place la pagination
const setPagination = (data) => {
  // bloc visible
  paginationLabel.classList.remove('invisible');
  // calcul nb pages
  const nbPages = Math.ceil(config.nbDocs / 30);
  // création liste de navigation
  const ul = document.createElement('ul');
  ul.setAttribute('class', 'nav');
  for (let i = 1; i <= nbPages; i++) {
    // créer <li class="nav-item"><a class="nav-link" href="#"></a></li>
    const li = document.createElement('li');
    const a = document.createElement('a');
    li.setAttribute('class', 'nav-item');
    a.setAttribute('class', 'nav-link');
    a.setAttribute('href', '#');
    a.innerHTML = i;
    li.appendChild(a);
    // ajouter à la liste
    ul.appendChild(li);
    // au clic, changer page
    a.addEventListener('click', toPage);
  }
  // suppression de l'existant
  pagination.innerHTML = '';
  // nouvelle liste
  pagination.appendChild(ul);
  // data renvoyé pour la suite
  return data;
}

/*
* Événements
*/

// supprimer le contenu d'un champ
// et rendre l'aide en ligne visible
function eraseField(e) {
  nbPublisHelp.classList.add('invisible');
  e.target.value = '';
}

// chaîne de traitement
function getDocs(e) {
  request()
  .then( setNbDocs )
  .then( setPagination )
  .then( printDocs )
  .catch(error => {
    // remise à zéro
    resetSearch(e);
    // afficher l'erreur dans la console
    console.error(error.message);
  });
}

// config à neuf
function resetSearch(e) {
  config.idHal = e.target.value;
  config.query = `?q=authIdHal_s:${config.idHal}`;
  config.nbDocs = 0;
  config.start = 0;
  documents.innerHTML = '';
  pagination.innerHTML = '';
  paginationLabel.classList.add('invisible');
}

// modifie les publis affichées
function toPage(e) {
  e.preventDefault();
  config.start = (e.target.innerText - 1) * 30;
  // relance la recherche des docs
  getDocs(e);
}

/*
* Exécution du script
*/
function run() {

  // récupérer les éléments
  const documents = document.getElementById('documents');
  const inputIdHal = document.getElementById('inputIdHal');
  const nbPublis = document.getElementById('nbPublis');
  const nbPublisHelp = document.getElementById('nbPublisHelp');
  const nbPublisLabel = document.getElementById('nbPublisLabel');
  const pagination = document.getElementById('pagination');
  const paginationLabel = document.getElementById('paginationLabel');

  // gestionnaire événements
  inputIdHal.addEventListener('click', eraseField);
  inputIdHal.addEventListener('change', resetSearch);
  inputIdHal.addEventListener('change', getDocs);

}

// au chargement de la page, lancer le script
window.addEventListener('load', run);
