import { Router } from 'express';
import Product from '../models/Product';

const router = Router();

// GET /api/categories - Obtener todas las categorías disponibles
router.get('/', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// GET /api/categories/:category/products - Obtener productos por categoría
router.get('/:category/products', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ 
      category: new RegExp(category, 'i'),
      isActive: true 
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos de la categoría' });
  }
});

export default router;