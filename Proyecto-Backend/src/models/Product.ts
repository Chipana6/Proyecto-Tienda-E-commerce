import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  supplier: string;
  minimumOrder: number;
  isActive: boolean;
  // Nuevos campos para moda
  brand?: string;
  size?: string[];
  color?: string[];
  material?: string;
  gender?: 'hombre' | 'mujer' | 'unisex';
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Nombre del producto es requerido'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Descripción es requerida'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Precio es requerido'],
    min: 0
  },
  stock: {
    type: Number,
    required: [true, 'Stock es requerido'],
    min: 0,
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Categoría es requerida'],
    trim: true
  },
  sku: {
    type: String,
    required: [true, 'SKU es requerido'],
    unique: true,
    trim: true
  },
  supplier: {
    type: String,
    required: [true, 'Proveedor es requerido'],
    trim: true
  },
  minimumOrder: {
    type: Number,
    required: [true, 'Pedido mínimo es requerido'],
    min: 1,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Nuevos campos
  brand: {
    type: String,
    trim: true
  },
  size: [{
    type: String,
    trim: true
  }],
  color: [{
    type: String,
    trim: true
  }],
  material: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ['hombre', 'mujer', 'unisex'],
    default: 'unisex'
  },
  images: [{
    type: String
  }]
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema);