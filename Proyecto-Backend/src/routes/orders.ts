import { Router } from 'express';
import Order from '../models/Order';

const router = Router();

// GET /api/orders - Obtener todas las órdenes
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'companyName contactName email')
      .populate('products.productId', 'name price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
});

// GET /api/orders/:id - Obtener orden por ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'companyName contactName email')
      .populate('products.productId', 'name price');
    
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la orden' });
  }
});

// POST /api/orders - Crear nueva orden
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    
    // Populate para retornar datos completos
    await order.populate('userId', 'companyName contactName email');
    await order.populate('products.productId', 'name price');
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear orden' });
  }
});

// PUT /api/orders/:id - Actualizar orden
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    )
    .populate('userId', 'companyName contactName email')
    .populate('products.productId', 'name price');
    
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar orden' });
  }
});

// DELETE /api/orders/:id - Eliminar orden
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    
    res.json({ message: 'Orden eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar orden' });
  }
});

export default router;