const Categorie = require("../models/Categorie");
const Produit = require("../models/Produit");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/photos/'); // Change 'uploads/' to your desired folder path
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
  });
  
  const upload = multer({ storage: storage });
// CRUD Operations
exports.createProduit = async (req, res) => {
    try {
        // Use Multer middleware for image upload (single image assumed)
    upload.single('photo')(req, res, async (err) => {
        if (err) {
          // Handle Multer specific errors
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({ message: 'Image size exceeds limit!' });
          } else {
            return res.status(500).json({ message: 'Error during image upload!' });
          }
        }



        const {nom,prix,marque,quantite,description,condition,categorieId} = req.body;
        const photo = req.file ? req.file.path : undefined; // Store path only if uploaded
        console.log(photo);
        const produit = await Produit.create({ nom,prix,marque,quantite,description,condition,categorieId });
        console.log(produit);
        res.status(201).json({ message: "Produit créé avec succès", produit });
      });

    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la création du produit", error });
    }
};

exports.getAllProduits = async (req, res) => {
    try {      
        const produits = await Produit.findAll();
        res.json({ message: "Produits récupérés", produits }); 
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des produits", error });
    }
};