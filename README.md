# Proyecto Semestral - E-commerce Distribuidora Mayorista

Sistema completo de e-commerce para distribución mayorista con panel administrativo, autenticación JWT y base de datos MongoDB.

## 🏗️ Arquitectura del Proyecto
Proyecto-Semestral/
├── distribuidora-frontend/ # Aplicación React
├── Proyecto-Backend/ # API REST con Node.js/Express + TypeScript
├── .gitignore # Archivos excluidos de Git
└── README.md # Documentación principal

## 🚀 Características Principales

### Frontend (distribuidora-frontend)
- **Tecnología**: React.js 18
- **Estilos**: CSS personalizado con Grid/Flexbox
- **Características**:
  - Catálogo de productos (Carteras, Jeans, Zapatillas, Chaquetas)
  - Carrito de compras con precios mayoristas
  - Sistema de favoritos
  - Panel de mayorista con descuentos por volumen
  - Panel administrativo
  - Autenticación de usuarios

### Backend (Proyecto-Backend)
- **Tecnología**: Node.js + Express.js + TypeScript
- **Base de datos**: MongoDB + Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Seguridad**: Bcrypt, CORS, Helmet
- **Características**:
  - API RESTful con TypeScript para mayor seguridad
  - CRUD completo de productos
  - Gestión de usuarios (admin, mayoristas, minoristas)
  - Sistema de autenticación JWT
  - Semilla de datos con 51 productos

## 📋 Prerrequisitos
- Node.js 16+ 
- MongoDB Community Server
- npm o yarn

## 📦 Dependencias y Librerías

### Backend (Proyecto-Backend)

# Dependencias principales
npm install express mongoose bcryptjs jsonwebtoken cors dotenv helmet

#  Dependencias de desarrollo (TypeScript)
npm install --save-dev typescript ts-node-dev nodemon
npm install --save-dev @types/node @types/express @types/bcryptjs @types/jsonwebtoken @types/cors

_________________________________________________________________________________________
## Frontend (distribuidora-frontend)
# Dependencias principales
npm install react react-dom react-scripts axios react-router-dom
## 🛠️ Instalación y Configuración
1. Clonar el repositorio
git clone https://github.com/tu-usuario/Proyecto-Tienda-E-commerce.git
cd Proyecto-Tienda-E-commerce
## Configurar Backend
cd Proyecto-Backend
npm install

# Configurar variables en .env
npm run dev
# Configurar Frontend
cd ../distribuidora-frontend
npm install
npm start
# Variables de Entorno
Backend (.env):
## env
MONGODB_URI=mongodb://localhost:27017/nasera_distribuidora
JWT_SECRET=tu_jwt_secret_super_seguro
JWT_EXPIRES_IN=24h
PORT=5000
NODE_ENV=development
Frontend (.env):
## env
REACT_APP_API_URL=http://localhost:5000/api
## Acceder a la aplicación
Frontend: http://localhost:3000

Backend: http://localhost:5000

API: http://localhost:5000/api
___________________________________________________________________________________________
## 🗃️ Modelos de Datos
Colecciones MongoDB:
users - Gestión de usuarios (admin, mayorista, minorista)
products - 51 productos con categorías embebidas
categories - Categorías disponibles (Carteras, Jeans, Zapatillas, Chaquetas)
## 📡 Endpoints del API
## Autenticación
POST /api/auth/register - Registrar nuevo usuario

POST /api/auth/login - Iniciar sesión

GET /api/auth/me - Perfil de usuario (requiere token)

## Productos
GET /api/products - Listar todos los productos (51)

GET /api/products/:id - Obtener producto por ID

GET /api/categories/:category/products - Productos por categoría

## Categorías
GET /api/categories - Listar categorías disponibles

🧪 Tests de Seguridad Realizados
## Autenticación JWT ✅
Pruebas realizadas:

✅ POST /api/auth/login con credenciales válidas → Retorna token JWT

✅ POST /api/auth/login con credenciales inválidas → Error 401

✅ GET /api/auth/me con token válido → Retorna datos de usuario

✅ GET /api/auth/me sin token → Error 401 Unauthorized

✅ GET /api/auth/me con token inválido → Error 400 Bad Request

## Resultado: Sistema de autenticación JWT funcionando correctamente.

## Autorización por Roles ✅
  ## Pruebas realizadas:

✅ Usuario admin puede acceder a rutas protegidas

✅ Usuario mayorista NO puede acceder a rutas de admin

✅ Usuario minorista NO puede acceder a rutas de admin

✅ Middleware de autorización rechaza acceso no autorizado con error 403

## Resultado: Control de acceso por roles implementado correctamente.
__________________________________________________________
## Validación de Datos ✅
Pruebas realizadas:

✅ POST /api/auth/register sin campos requeridos → Error 400

✅ POST /api/auth/register con email duplicado → Error 400

✅ POST /api/auth/login sin email/contraseña → Error 400

✅ Validación de formato de email

✅ Validación de longitud mínima de contraseña

Resultado: Validación de datos de entrada funcionando.
_______________________________________________________________
## Protección de Rutas ✅
Pruebas realizadas:

✅ Rutas públicas (/api/products, /api/health) accesibles sin autenticación

✅ Rutas protegidas (/api/auth/me) requieren autenticación

✅ Rutas de admin (/api/admin/*) requieren rol admin

✅ Acceso directo a rutas protegidas sin token → 401

Resultado: Sistema de protección de rutas implementado correctamente.
_________________________________________________________________
## Seguridad de Contraseñas ✅
Pruebas realizadas:

✅ Contraseñas almacenadas con hash bcrypt (no en texto plano)

✅ Verificación de contraseñas con comparePassword

✅ Salt rounds configurados para hashing seguro

Resultado: Manejo seguro de contraseñas implementado.
___________________________________________________________________
## Pruebas de API con Postman ✅
Colección de pruebas ejecutada:

# Pruebas de Autenticación
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me (con/sin token)

# Pruebas de Productos
GET /api/products
GET /api/products/:id
GET /api/categories/:category/products

# Pruebas de Categorías
GET /api/categories

# Pruebas de Seguridad
GET /api/auth/me (sin token → 401)
