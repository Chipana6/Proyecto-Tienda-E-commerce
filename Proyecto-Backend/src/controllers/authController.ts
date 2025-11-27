import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Validar campos requeridos
    if (!name || !email || !password) {
      res.status(400).json({ 
        message: 'Todos los campos son requeridos: name, email, password' 
      });
      return;
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'El usuario ya existe' });
      return;
    }

    // Crear nuevo usuario
    const user = new User({ 
      name: name.trim(),
      email: email.toLowerCase().trim(), 
      password: password 
    });
    
    await user.save();

    // Generar token JWT CORREGIDO
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' } // 24 horas en formato correcto
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error: any) {
    console.error('Error en registro:', error);
    
    if (error.code === 11000) {
      res.status(400).json({ message: 'El email ya está registrado' });
      return;
    }
    
    if (error.name === 'ValidationError') {
      res.status(400).json({ 
        message: 'Datos de entrada inválidos',
        error: error.message 
      });
      return;
    }

    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
      res.status(400).json({ 
        message: 'Email y password son requeridos' 
      });
      return;
    }

    // Verificar si el usuario existe
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      res.status(400).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Generar token JWT CORREGIDO
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' } // 24 horas en formato correcto
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error: any) {
    console.error('Error en login:', error);
    
    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};