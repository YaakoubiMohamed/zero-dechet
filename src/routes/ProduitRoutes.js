const express = require('express');
const router = express.Router();

const ProduitController = require('../controllers/ProduitController')


router.get('/produits', ProduitController.getAllProduits);

// router.get('/produits/:produitID', ProduitController.getProduitById);

router.post('/produits', ProduitController.createProduit);

// router.put('/produits/:produitID', ProduitController.updateProduit);

// router.delete('/produits/:produitID', ProduitController.deleteProduit);

module.exports = router;