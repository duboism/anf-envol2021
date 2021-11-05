const express = require('express');
const fs = require('fs');
const router = express.Router();

const doctypes = [
  {
    "code": "ART",
    "type": "Article dans une revue"
  },
  {
    "code": "COMM",
    "type": "Communication dans un congrès"
  },
  {
    "code": "OUV",
    "type": "Ouvrage"
  },
  {
    "code": "COUV",
    "type": "Chapitre d’ouvrage"
  },
  {
    "code": "DOUV",
    "type": "Direction d’ouvrage"
  },
  {
    "code": "OTHER",
    "type": "Autre publication"
  },
  {
    "code": "REPORT",
    "type": "Rapport"
  },
  {
    "code": "THESE",
    "type": "Thèse"
  },
  {
    "code": "HDR",
    "type": "Habilitation à diriger des recherches"
  }
];

/* GET doc form. */
router.get('/new', (req, res, next) => {

  const doc = {
    halId_s: String(),
    label_s: String(),
    docType_s: doctypes,
    publicationDate_tdate: String(),
    docTypeSelected: null
  };

  res.render('doc-form', {
    title: "Ajout d’une référence",
    action: "./new",
    verb: "Ajouter",
    doc: doc
  });

});

/* POST doc form. */
router.post('/new', (req, res, next) => {

  var rows;
  const doc = req.body;

  fs.readFile('./private/db.json', 'utf8', (err, data) => {

    if (err) throw err;
    rows = JSON.parse(data);

    if (!doc.halId_s) doc.halId_s = rows.response.numFound + 1;
    rows.response.docs.push(doc);
    rows.response.numFound += 1;

    fs.writeFile('./private/db.json', JSON.stringify(rows), (error) => {
      if (error) throw error;
    });

    res.status(200).redirect('/');

  });

});

/* GET update doc form */
router.get('/update/:id', (req, res, next) => {

  const id = req.params.id;

  const doc = {
    halId_s: id,
    label_s: String(),
    docType_s: doctypes,
    publicationDate_tdate: String(),
    docTypeSelected: Object()
  };

  var rows;

  fs.readFile('./private/db.json', 'utf8', (err, data) => {

    if (err) throw err;
    rows = JSON.parse(data);

    const result = rows.response.docs.filter(row => row.halId_s == id)[0];
    const doctype = doctypes.filter(dt => dt.code == result.docType_s)[0];
    doc.label_s = result.label_s;
    doc.publicationDate_tdate = result.publicationDate_tdate.substring(0,4);
    doc.docTypeSelected.code = result.docType_s;
    doc.docTypeSelected.type = doctype.type;

    res.render('doc-form', {
      title: "Modifier une référence",
      action: "./" + id,
      verb: "Modifier",
      doc: doc
    });

  });

});

/* POST update doc form */
router.post('/update/:id', (req, res, next) => {

  const id = req.params.id;
  const doc = req.body;

  var rows;

  fs.readFile('./private/db.json', 'utf8', (err, data) => {

    if (err) throw err;
    rows = JSON.parse(data);

    const result = rows.response.docs.filter(row => row.halId_s != id);
    rows.response.docs = result;
    rows.response.docs.push(doc);

    fs.writeFile('./private/db.json', JSON.stringify(rows), (error) => {
      if (error) throw error;
    });

  });

  res.status(200).redirect('/');

});

/* GET delete doc */
router.get('/delete/:id', (req, res, next) => {

  const id = req.params.id;

  var rows;
  fs.readFile('./private/db.json', 'utf8', (err, data) => {

    if (err) throw err;
    rows = JSON.parse(data);

    const result = rows.response.docs.filter(row => row.halId_s != id);
    rows.response.numFound = result.length;
    rows.response.docs = result;

    fs.writeFile('./private/db.json', JSON.stringify(rows), (error) => {
      if (error) throw error;
    });

    res.status(200).redirect('/');

  })
});

module.exports = router;
