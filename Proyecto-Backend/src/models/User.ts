import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  companyName: string;
  contactName: string;
  email: string;
  password: string;
  taxId: string;
  phone: string;
  userType: 'admin' | 'wholesaler' | 'retailer';
  registrationDate: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  companyName: {
    type: String,
    required: [true, 'Nombre de empresa es requerido'],
    trim: true
  },
  contactName: {
    type: String,
    required: [true, 'Nombre de contacto es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email es requerido'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Contraseña es requerida'],
    minlength: 6
  },
  taxId: {
    type: String,
    required: [true, 'RUC/DNI es requerido'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Teléfono es requerido'],
    trim: true
  },
  userType: {
    type: String,
    enum: ['admin', 'wholesaler', 'retailer'],
    default: 'retailer'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

// Middleware para hashear la contraseña antes de guardar
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    const user = this as any;
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Método para comparar contraseñas - VERSIÓN CORREGIDA
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    const user = this as any;
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (error) {
    console.error('❌ Error en comparePassword:', error);
    return false;
  }
};

export default mongoose.model<IUser>('User', UserSchema);