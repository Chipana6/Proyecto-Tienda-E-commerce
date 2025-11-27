import mongoose from 'mongoose';
import User from '../models/User';
import Product from '../models/Product';
import Order from '../models/Order';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect('mongodb://localhost:27017/nasera-tienda');
    console.log('🔗 Conectado a MongoDB');

    // Limpiar datos existentes
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('🧹 Datos anteriores eliminados');

    // Crear usuarios
    const users = await User.create([
      {
        companyName: 'Nasera Fashion Admin',
        contactName: 'Administrador Principal',
        email: 'admin@nasera.com',
        password: 'admin123',
        taxId: '20123456781',
        phone: '+51 987 654 321',
        userType: 'admin'
      },
      {
        companyName: 'Distribuidora Moda Perú SAC',
        contactName: 'Carlos Rodríguez',
        email: 'carlos@modaperu.com',
        password: 'mayorista123',
        taxId: '20456789012',
        phone: '+51 955 444 333',
        userType: 'wholesaler'
      },
      {
        companyName: 'Boutique Elegante',
        contactName: 'María González',
        email: 'maria@boutiqueelegante.com',
        password: 'minorista123',
        taxId: '10456789013',
        phone: '+51 944 333 222',
        userType: 'retailer'
      },
      {
        companyName: 'Importadora Style & Co',
        contactName: 'Roberto Silva',
        email: 'roberto@styleimport.com',
        password: 'andina123',
        taxId: '20567890123',
        phone: '+51 966 777 888',
        userType: 'wholesaler'
      },
      {
        companyName: 'Tienda Urban Look',
        contactName: 'Laura Mendoza',
        email: 'laura@urbanlook.com',
        password: 'central123',
        taxId: '10432109876',
        phone: '+51 933 222 111',
        userType: 'retailer'
      }
    ]);
    console.log('👥 Usuarios creados:', users.length);

    // Crear productos de moda reales (51 productos)
    const products = await Product.create([
      // Carteras (15 productos)
      {
        name: "Cartera Elegante 1",
        description: "Cartera de cuero genuino con diseño moderno.",
        price: 180,
        stock: 25,
        category: "Carteras",
        sku: "CAR-ELE-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 3,
        brand: "Elegance",
        size: ["Único"],
        color: ["Negro", "Marrón"],
        material: "Cuero genuino",
        gender: "mujer"
      },
      {
        name: "Cartera Elegante 2", 
        description: "Cartera elegante para ocasiones especiales.",
        price: 220,
        stock: 20,
        category: "Carteras",
        sku: "CAR-ELE-002",
        supplier: "Importadora Style & Co",
        minimumOrder: 3,
        brand: "Elegance",
        size: ["Único"],
        color: ["Rojo", "Negro"],
        material: "Cuero sintético",
        gender: "mujer"
      },
      {
        name: "Cartera Elegante 3",
        description: "Cartera casual de uso diario.",
        price: 150,
        stock: 30,
        category: "Carteras",
        sku: "CAR-ELE-003",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 5,
        brand: "Casual Style",
        size: ["Único"],
        color: ["Azul", "Beige"],
        material: "Poliéster",
        gender: "mujer"
      },
      {
        name: "Cartera Premium",
        description: "Cartera de cuero premium con múltiples compartimentos.",
        price: 280,
        stock: 15,
        category: "Carteras",
        sku: "CAR-PRE-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 2,
        brand: "Premium Lux",
        size: ["Único"],
        color: ["Negro", "Café"],
        material: "Cuero premium",
        gender: "mujer"
      },
      {
        name: "Cartera Deportiva",
        description: "Cartera estilo deportivo y funcional.",
        price: 190,
        stock: 35,
        category: "Carteras",
        sku: "CAR-DEP-001",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 4,
        brand: "Sport Style",
        size: ["Único"],
        color: ["Negro", "Gris", "Azul"],
        material: "Nylon resistente",
        gender: "unisex"
      },
      {
        name: "Cartera Vintage",
        description: "Cartera con diseño vintage y clásico.",
        price: 210,
        stock: 18,
        category: "Carteras",
        sku: "CAR-VIN-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 3,
        brand: "Vintage Co",
        size: ["Único"],
        color: ["Marrón", "Negro"],
        material: "Cuero envejecido",
        gender: "mujer"
      },
      {
        name: "Cartera Minimalista",
        description: "Cartera minimalista para el día a día.",
        price: 170,
        stock: 40,
        category: "Carteras",
        sku: "CAR-MIN-001",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 6,
        brand: "Minimal",
        size: ["Único"],
        color: ["Negro", "Blanco", "Gris"],
        material: "Cuero sintético",
        gender: "mujer"
      },
      {
        name: "Bolso Bandolera",
        description: "Bolso bandolera estilo urbano.",
        price: 240,
        stock: 22,
        category: "Carteras",
        sku: "BOL-BAN-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 3,
        brand: "Urban Style",
        size: ["Mediano", "Grande"],
        color: ["Negro", "Khaki", "Azul Marino"],
        material: "Lona y cuero",
        gender: "unisex"
      },
      {
        name: "Cartera Ejecutiva",
        description: "Cartera ejecutiva para profesionales.",
        price: 260,
        stock: 12,
        category: "Carteras",
        sku: "CAR-EJE-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 2,
        brand: "Executive",
        size: ["Único"],
        color: ["Negro", "Marrón"],
        material: "Cuero italiano",
        gender: "unisex"
      },
      {
        name: "Cartera Compacta",
        description: "Cartera compacta y práctica.",
        price: 130,
        stock: 50,
        category: "Carteras",
        sku: "CAR-COM-001",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 8,
        brand: "Compact Style",
        size: ["Pequeño"],
        color: ["Rosa", "Azul", "Negro"],
        material: "Poliéster",
        gender: "mujer"
      },
      {
        name: "Cartera de Lujo",
        description: "Cartera de lujo con detalles premium.",
        price: 350,
        stock: 8,
        category: "Carteras",
        sku: "CAR-LUX-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Luxury",
        size: ["Único"],
        color: ["Negro", "Rojo"],
        material: "Cuero de búfalo",
        gender: "mujer"
      },
      {
        name: "Cartera Casual",
        description: "Cartera casual para uso diario.",
        price: 160,
        stock: 45,
        category: "Carteras",
        sku: "CAR-CAS-001",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 7,
        brand: "Everyday",
        size: ["Único"],
        color: ["Marrón", "Negro", "Azul"],
        material: "Cuero sintético",
        gender: "mujer"
      },
      {
        name: "Cartera Pequeña",
        description: "Cartera pequeña y funcional.",
        price: 120,
        stock: 60,
        category: "Carteras",
        sku: "CAR-PEQ-001",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 10,
        brand: "Mini Style",
        size: ["Pequeño"],
        color: ["Multicolor", "Negro", "Blanco"],
        material: "Poliéster",
        gender: "mujer"
      },
      {
        name: "Cartera Moderna",
        description: "Cartera con diseño moderno y actual.",
        price: 200,
        stock: 28,
        category: "Carteras",
        sku: "CAR-MOD-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 4,
        brand: "Modern",
        size: ["Único"],
        color: ["Gris", "Negro", "Azul"],
        material: "Cuero ecológico",
        gender: "mujer"
      },
      {
        name: "Cartera De Lujo 2",
        description: "Cartera de lujo con materiales exclusivos.",
        price: 320,
        stock: 10,
        category: "Carteras",
        sku: "CAR-LUX-002",
        supplier: "Importadora Style & Co",
        minimumOrder: 2,
        brand: "Premium",
        size: ["Único"],
        color: ["Negro", "Vino"],
        material: "Cuero de cocodrilo sintético",
        gender: "mujer"
      },

      // Jeans (13 productos)
      {
        name: "Jean Acne Studio",
        description: "Jean premium de la marca Acne Studio.",
        price: 450,
        stock: 35,
        category: "Jeans",
        sku: "JEA-ACS-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 2,
        brand: "Acne Studio",
        size: ["28", "30", "32", "34", "36"],
        color: ["Azul Oscuro", "Negro"],
        material: "Denim premium",
        gender: "hombre"
      },
      {
        name: "Jean Acne Studio 2",
        description: "Segundo modelo de Jean Acne Studio.",
        price: 420,
        stock: 40,
        category: "Jeans",
        sku: "JEA-ACS-002",
        supplier: "Importadora Style & Co",
        minimumOrder: 2,
        brand: "Acne Studio",
        size: ["28", "30", "32", "34"],
        color: ["Azul Claro", "Gris"],
        material: "Denim elastano",
        gender: "hombre"
      },
      {
        name: "Jean Dior Hombre",
        description: "Jean de lujo de Christian Dior.",
        price: 680,
        stock: 15,
        category: "Jeans",
        sku: "JEA-DIO-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Christian Dior",
        size: ["30", "32", "34", "36"],
        color: ["Azul Oscuro", "Negro"],
        material: "Denim premium italiano",
        gender: "hombre"
      },
      {
        name: "Jean Louis Vuitton",
        description: "Jean exclusivo de Louis Vuitton.",
        price: 750,
        stock: 12,
        category: "Jeans",
        sku: "JEA-LV-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Louis Vuitton",
        size: ["30", "32", "34"],
        color: ["Azul Clásico", "Negro"],
        material: "Denim de lujo",
        gender: "hombre"
      },
      {
        name: "Jean LV x Supreme",
        description: "Edición especial LV colaboración Supreme.",
        price: 800,
        stock: 8,
        category: "Jeans",
        sku: "JEA-LVS-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Louis Vuitton x Supreme",
        size: ["32", "34"],
        color: ["Azul Denim", "Rojo"],
        material: "Denim colaboración",
        gender: "hombre"
      },
      {
        name: "Jean Supreme",
        description: "Jean de la marca Supreme.",
        price: 380,
        stock: 25,
        category: "Jeans",
        sku: "JEA-SUP-001",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 3,
        brand: "Supreme",
        size: ["28", "30", "32", "34", "36"],
        color: ["Azul", "Negro", "Gris"],
        material: "Denim streetwear",
        gender: "hombre"
      },
      {
        name: "Jean Supreme 2",
        description: "Segundo modelo de Jean Supreme.",
        price: 360,
        stock: 30,
        category: "Jeans",
        sku: "JEA-SUP-002",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 3,
        brand: "Supreme",
        size: ["28", "30", "32", "34"],
        color: ["Azul Claro", "Negro"],
        material: "Denim comfort",
        gender: "hombre"
      },
      {
        name: "Jean Vnno",
        description: "Jean de la marca Vnno.",
        price: 290,
        stock: 45,
        category: "Jeans",
        sku: "JEA-VNN-001",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 5,
        brand: "Vnno",
        size: ["28", "30", "32", "34", "36", "38"],
        color: ["Azul Oscuro", "Negro", "Gris"],
        material: "Denim stretch",
        gender: "hombre"
      },
      {
        name: "Jean Vnno 2",
        description: "Segundo modelo de Jean Vnno.",
        price: 270,
        stock: 50,
        category: "Jeans",
        sku: "JEA-VNN-002",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 5,
        brand: "Vnno",
        size: ["28", "30", "32", "34", "36"],
        color: ["Azul Claro", "Negro"],
        material: "Denim elástico",
        gender: "hombre"
      },
      {
        name: "Jean Palace",
        description: "Jean de la marca Palace.",
        price: 340,
        stock: 22,
        category: "Jeans",
        sku: "JEA-PAL-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 2,
        brand: "Palace",
        size: ["30", "32", "34", "36"],
        color: ["Azul Palace", "Negro"],
        material: "Denim skate",
        gender: "hombre"
      },
      {
        name: "Jean Crome Hearts",
        description: "Jean exclusivo de Crome Hearts.",
        price: 520,
        stock: 18,
        category: "Jeans",
        sku: "JEA-CH-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 2,
        brand: "Crome Hearts",
        size: ["30", "32", "34"],
        color: ["Negro", "Azul Oscuro"],
        material: "Denim artesanal",
        gender: "hombre"
      },
      {
        name: "Jean Denim Tears",
        description: "Jean de la marca Denim Tears.",
        price: 480,
        stock: 20,
        category: "Jeans",
        sku: "JEA-DT-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 2,
        brand: "Denim Tears",
        size: ["30", "32", "34", "36"],
        color: ["Azul Denim", "Negro"],
        material: "Denim artístico",
        gender: "hombre"
      },
      {
        name: "Jean CH Hombre",
        description: "Jean casual para hombre.",
        price: 310,
        stock: 55,
        category: "Jeans",
        sku: "JEA-CHH-001",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 6,
        brand: "Casual Hombre",
        size: ["28", "30", "32", "34", "36", "38"],
        color: ["Azul", "Negro", "Gris"],
        material: "Denim básico",
        gender: "hombre"
      },

      // Zapatillas (16 productos)
      {
        name: "Air Force One Clásicas",
        description: "Air Force One clásicas blancas.",
        price: 320,
        stock: 40,
        category: "Zapatillas",
        sku: "ZAP-AF1-001",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 5,
        brand: "Nike",
        size: ["38", "39", "40", "41", "42", "43", "44"],
        color: ["Blanco"],
        material: "Cuero y goma",
        gender: "unisex"
      },
      {
        name: "Air Force One Picante Red",
        description: "Air Force One en color rojo intenso.",
        price: 340,
        stock: 25,
        category: "Zapatillas",
        sku: "ZAP-AF1-002",
        supplier: "Importadora Style & Co",
        minimumOrder: 3,
        brand: "Nike",
        size: ["38", "39", "40", "41", "42", "43"],
        color: ["Rojo"],
        material: "Cuero premium",
        gender: "unisex"
      },
      {
        name: "Air Force One Nocta",
        description: "Air Force One edición Nocta.",
        price: 380,
        stock: 18,
        category: "Zapatillas",
        sku: "ZAP-AF1-003",
        supplier: "Importadora Style & Co",
        minimumOrder: 2,
        brand: "Nike Nocta",
        size: ["40", "41", "42", "43", "44"],
        color: ["Negro", "Blanco"],
        material: "Cuero nocturno",
        gender: "hombre"
      },
      {
        name: "Air Force One Nocta Citron",
        description: "Air Force One Nocta color Citron.",
        price: 390,
        stock: 15,
        category: "Zapatillas",
        sku: "ZAP-AF1-004",
        supplier: "Importadora Style & Co",
        minimumOrder: 2,
        brand: "Nike Nocta",
        size: ["40", "41", "42", "43"],
        color: ["Amarillo Citron", "Negro"],
        material: "Cuero y malla",
        gender: "hombre"
      },
      {
        name: "Jordan 1 Low Concord",
        description: "Jordan 1 Low color Concord.",
        price: 420,
        stock: 22,
        category: "Zapatillas",
        sku: "ZAP-J1L-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 3,
        brand: "Jordan",
        size: ["38", "39", "40", "41", "42", "43"],
        color: ["Concord", "Blanco"],
        material: "Cuero y gamuza",
        gender: "unisex"
      },
      {
        name: "Jordan 1 Low UNC",
        description: "Jordan 1 Low color UNC.",
        price: 410,
        stock: 24,
        category: "Zapatillas",
        sku: "ZAP-J1L-002",
        supplier: "Importadora Style & Co",
        minimumOrder: 3,
        brand: "Jordan",
        size: ["38", "39", "40", "41", "42", "43"],
        color: ["UNC Blue", "Blanco"],
        material: "Cuero universitario",
        gender: "unisex"
      },
      {
        name: "Jordan 1 Low Fragment x Travis Scott",
        description: "Jordan 1 Low Fragment colaboración Travis Scott.",
        price: 680,
        stock: 12,
        category: "Zapatillas",
        sku: "ZAP-J1L-003",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Jordan x Fragment x Travis Scott",
        size: ["40", "41", "42", "43"],
        color: ["Azul Fragment", "Blanco"],
        material: "Cuero colaboración",
        gender: "hombre"
      },
      {
        name: "Jordan 1 Low Travis Scott Moca",
        description: "Jordan 1 Low Travis Scott color Moca.",
        price: 720,
        stock: 10,
        category: "Zapatillas",
        sku: "ZAP-J1L-004",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Jordan x Travis Scott",
        size: ["40", "41", "42", "43"],
        color: ["Moca", "Café"],
        material: "Cuero y suede",
        gender: "hombre"
      },
      {
        name: "Jordan 1 Low Travis Scott Reverse Moca",
        description: "Jordan 1 Low Travis Scott Reverse Moca.",
        price: 710,
        stock: 11,
        category: "Zapatillas",
        sku: "ZAP-J1L-005",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Jordan x Travis Scott",
        size: ["40", "41", "42", "43"],
        color: ["Reverse Moca", "Blanco"],
        material: "Cuero reverso",
        gender: "hombre"
      },
      {
        name: "Jordan 1 Low Travis Scott Reverse Olive",
        description: "Jordan 1 Low Travis Scott Reverse Olive.",
        price: 700,
        stock: 13,
        category: "Zapatillas",
        sku: "ZAP-J1L-006",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Jordan x Travis Scott",
        size: ["40", "41", "42", "43"],
        color: ["Oliva", "Verde Militar"],
        material: "Cuero y gamuza",
        gender: "hombre"
      },
      {
        name: "Jordan 1 Low Travis Scott Fragment Blue",
        description: "Jordan 1 Low Travis Scott Fragment Blue.",
        price: 690,
        stock: 14,
        category: "Zapatillas",
        sku: "ZAP-J1L-007",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Jordan x Travis Scott",
        size: ["40", "41", "42", "43"],
        color: ["Azul Fragment", "Blanco"],
        material: "Cuero premium",
        gender: "hombre"
      },
      {
        name: "Jordan 1 Low Travis Scott Medium Olive",
        description: "Jordan 1 Low Travis Scott Medium Olive.",
        price: 680,
        stock: 16,
        category: "Zapatillas",
        sku: "ZAP-J1L-008",
        supplier: "Importadora Style & Co",
        minimumOrder: 2,
        brand: "Jordan x Travis Scott",
        size: ["40", "41", "42", "43"],
        color: ["Oliva Medio", "Negro"],
        material: "Cuero y suede",
        gender: "hombre"
      },
      {
        name: "Jordan 1 Low Travis Scott Black Phantom",
        description: "Jordan 1 Low Travis Scott Black Phantom.",
        price: 750,
        stock: 9,
        category: "Zapatillas",
        sku: "ZAP-J1L-009",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Jordan x Travis Scott",
        size: ["40", "41", "42", "43"],
        color: ["Negro Fantasma"],
        material: "Cuero negro mate",
        gender: "hombre"
      },
      {
        name: "Jordan 1 Low Travis Scott Black PlayStation",
        description: "Jordan 1 Low Travis Scott Black PlayStation.",
        price: 780,
        stock: 8,
        category: "Zapatillas",
        sku: "ZAP-J1L-010",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Jordan x Travis Scott",
        size: ["41", "42", "43"],
        color: ["Negro PlayStation", "Azul"],
        material: "Cuero edición especial",
        gender: "hombre"
      },
      {
        name: "Jordan 1 Low Travis Scott Velvet Brown",
        description: "Jordan 1 Low Travis Scott Velvet Brown.",
        price: 730,
        stock: 10,
        category: "Zapatillas",
        sku: "ZAP-J1L-011",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Jordan x Travis Scott",
        size: ["40", "41", "42", "43"],
        color: ["Marrón Terciopelo"],
        material: "Terciopelo y cuero",
        gender: "hombre"
      },
      {
        name: "Jordan 1 Low Travis Scott Canary",
        description: "Jordan 1 Low Travis Scott color Canary.",
        price: 710,
        stock: 12,
        category: "Zapatillas",
        sku: "ZAP-J1L-012",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Jordan x Travis Scott",
        size: ["40", "41", "42", "43"],
        color: ["Amarillo Canario", "Negro"],
        material: "Cuero y gamuza",
        gender: "hombre"
      },

      // Chaquetas y Abrigos (7 productos)
      {
        name: "Louis Vuitton Varsity Jacket Green",
        description: "Chaqueta tipo varsity de Louis Vuitton verde.",
        price: 1200,
        stock: 8,
        category: "Chaquetas",
        sku: "CHA-LVV-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Louis Vuitton",
        size: ["S", "M", "L", "XL"],
        color: ["Verde", "Blanco"],
        material: "Lana y cuero",
        gender: "hombre"
      },
      {
        name: "Louis Vuitton Varsity Jacket White",
        description: "Chaqueta tipo varsity de Louis Vuitton blanca.",
        price: 1250,
        stock: 7,
        category: "Chaquetas",
        sku: "CHA-LVV-002",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Louis Vuitton",
        size: ["S", "M", "L"],
        color: ["Blanco", "Negro"],
        material: "Lana premium",
        gender: "hombre"
      },
      {
        name: "Louis Vuitton Denim Jacket",
        description: "Chaqueta de mezclilla Louis Vuitton.",
        price: 1100,
        stock: 10,
        category: "Chaquetas",
        sku: "CHA-LVD-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 1,
        brand: "Louis Vuitton",
        size: ["S", "M", "L", "XL"],
        color: ["Azul Denim", "Negro"],
        material: "Denim de lujo",
        gender: "unisex"
      },
      {
        name: "Adidas Chinese New Year Jacket Blue",
        description: "Chaqueta Adidas edición Año Nuevo Chino azul.",
        price: 580,
        stock: 20,
        category: "Chaquetas",
        sku: "CHA-ADC-001",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 3,
        brand: "Adidas",
        size: ["S", "M", "L", "XL"],
        color: ["Azul", "Rojo", "Dorado"],
        material: "Poliéster y algodón",
        gender: "unisex"
      },
      {
        name: "Supreme x The North Face",
        description: "Chaqueta Supreme colaboración The North Face.",
        price: 950,
        stock: 15,
        category: "Chaquetas",
        sku: "CHA-SNT-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 2,
        brand: "Supreme x The North Face",
        size: ["S", "M", "L", "XL"],
        color: ["Negro", "Rojo", "Naranja"],
        material: "Nylon técnico",
        gender: "unisex"
      },
      {
        name: "Nike x Supreme",
        description: "Chaqueta Nike colaboración Supreme.",
        price: 890,
        stock: 18,
        category: "Chaquetas",
        sku: "CHA-NIS-001",
        supplier: "Importadora Style & Co",
        minimumOrder: 2,
        brand: "Nike x Supreme",
        size: ["S", "M", "L", "XL"],
        color: ["Negro", "Blanco", "Rojo"],
        material: "Poliéster deportivo",
        gender: "unisex"
      },
      {
        name: "Stussy 8 Ball",
        description: "Chaqueta Stussy con diseño 8 Ball.",
        price: 620,
        stock: 25,
        category: "Chaquetas",
        sku: "CHA-STU-001",
        supplier: "Distribuidora Moda Perú",
        minimumOrder: 4,
        brand: "Stussy",
        size: ["S", "M", "L", "XL"],
        color: ["Negro", "Blanco"],
        material: "Algodón y poliéster",
        gender: "unisex"
      }
    ]);
    console.log('📦 Productos creados:', products.length);

    console.log('✅ Datos de moda insertados correctamente');
    console.log('\n📊 Resumen:');
    console.log(`   👥 Usuarios: ${users.length}`);
    console.log(`   📦 Productos: ${products.length}`);
    console.log('\n🏪 Categorías disponibles:');
    console.log('   👜 Carteras (15 productos)');
    console.log('   👖 Jeans (13 productos)');
    console.log('   👟 Zapatillas (16 productos)');
    console.log('   🧥 Chaquetas (7 productos)');
    console.log('\n🔑 Credenciales para prueba:');
    console.log('   Admin: admin@nasera.com / admin123');
    console.log('   Mayorista: carlos@modaperu.com / mayorista123');
    console.log('   Minorista: maria@boutiqueelegante.com / minorista123');

  } catch (error) {
    console.error('❌ Error en el seeder:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
    process.exit(0);
  }
};

// Ejecutar el seeder
seedData();