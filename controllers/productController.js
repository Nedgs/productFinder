// controllers/productController.js

const puppeteer = require('puppeteer');

// Fonction pour vérifier la disponibilité du produit
exports.checkAvailability = async (req, res) => {
    try {
        const productUrl = req.body.productUrl;

        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null, // Permet de désactiver la taille de fenêtre par défaut
            args: ['--start-maximized'] // Utilise l'argument --start-maximized pour démarrer Chrome en plein écran
          });
        const page = await browser.newPage();
        await page.goto(productUrl);
        // await page.setViewport({ width: '100%', height: '100%' });

        try {
            await page.waitForSelector('button#didomi-notice-agree-button', { timeout: 5000 });
            await page.click('button#didomi-notice-agree-button');
            console.log('Cookies accepted.');
        } catch (error) {
            console.error('Error accepting cookies:', error);
        }

        await new Promise(r => setTimeout(r, 3000))

        // Exemple : Vérifier si le bouton "Ajouter au panier" est présent
        const addToCartButton = await page.$('button.big-button');

        console.log('addToCartButton:', addToCartButton);

        await new Promise(r => setTimeout(r, 3000))
        const isAvailable = !!addToCartButton;

        await browser.close();

        if (isAvailable) {
            res.status(200).json({ message: 'Product is available.' });
        } else {
            res.status(404).json({ message: 'Product is not available.' });
        }
    } catch (error) {
        console.error('Error checking product availability:', error);
        res.status(500).json({ message: 'An error occurred while checking product availability.' });
    }
};
