import { Router } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { authenticate } from '../middlewares/auth';

const router = Router();

// POST /api/auth/login - Login de usuarios
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Intento de login:', email);

    // Validar campos requeridos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('❌ Usuario no encontrado:', email);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    console.log('✅ Usuario encontrado:', user.email);

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('❌ Contraseña incorrecta para:', email);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    console.log('✅ Contraseña válida para:', email);

    // Generar token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      userType: user.userType,
      companyName: user.companyName
    });

    console.log('✅ Token generado para:', user.email);

    res.json({
      token,
      user: {
        id: user._id,
        companyName: user.companyName,
        contactName: user.contactName,
        email: user.email,
        userType: user.userType,
        taxId: user.taxId,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// POST /api/auth/register - Registro de usuarios
router.post('/register', async (req, res) => {
  try {
    const { companyName, contactName, email, password, taxId, phone, userType } = req.body;

    console.log('📝 Intento de registro:', email);

    // Validar campos requeridos
    if (!companyName || !contactName || !email || !password || !taxId || !phone) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Crear nuevo usuario
    const user = new User({
      companyName,
      contactName,
      email: email.toLowerCase(),
      password,
      taxId,
      phone,
      userType: userType || 'retailer'
    });

    await user.save();
    console.log('✅ Usuario registrado:', user.email);

    // Generar token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      userType: user.userType,
      companyName: user.companyName
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        companyName: user.companyName,
        contactName: user.contactName,
        email: user.email,
        userType: user.userType,
        taxId: user.taxId,
        phone: user.phone
      }
    });
  } catch (error: any) {
    console.error('❌ Error en registro:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    res.status(400).json({ error: error.message });
  }
});

// GET /api/auth/me - Obtener usuario actual
router.get('/me', authenticate, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('❌ Error obteniendo usuario:', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

export default router;