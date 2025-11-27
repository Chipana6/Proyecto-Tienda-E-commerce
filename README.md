# Proyecto Semestral - E-commerce Distribuidora Mayorista

Sistema completo de e-commerce para distribución mayorista con panel administrativo, autenticación JWT y base de datos MongoDB.

## 🏗️ Arquitectura del Proyecto
Proyecto-Semestral/
├── distribuidora-frontend/     # Aplicación React
├── Proyecto-Backend/          # API REST con Node.js/Express
├── .gitignore                 # Archivos excluidos de Git
└── README.md                  # Documentación principal

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
- **Tecnología**: Node.js + Express.js
- **Base de datos**: MongoDB + Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Seguridad**: Bcrypt, CORS, Helmet
- **Características**:
  - API RESTful
  - CRUD completo de productos
  - Gestión de usuarios (admin, mayoristas, minoristas)
  - Sistema de autenticación JWT
  - Semilla de datos con 51 productos

## 📋 Prerrequisitos

- Node.js 16+ 
- MongoDB Community Server
- npm o yarn

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/Proyecto-Tienda-E-commerce
.git
cd proyecto-semestral

_________________________________________________________________________________________
## 🧪 Tests de Seguridad Realizados

### 1. **Autenticación JWT** ✅
**Pruebas realizadas:**
- ✅ `POST /api/auth/login` con credenciales válidas → Retorna token JWT
- ✅ `POST /api/auth/login` con credenciales inválidas → Error 401
- ✅ `GET /api/auth/me` con token válido → Retorna datos de usuario
- ✅ `GET /api/auth/me` sin token → Error 401 Unauthorized
- ✅ `GET /api/auth/me` con token inválido → Error 400 Bad Request

**Resultado:** Sistema de autenticación JWT funcionando correctamente.

### 2. **Autorización por Roles** ✅
**Pruebas realizadas:**
- ✅ Usuario admin puede acceder a rutas protegidas
- ✅ Usuario mayorista NO puede acceder a rutas de admin
- ✅ Usuario minorista NO puede acceder a rutas de admin
- ✅ Middleware de autorización rechaza acceso no autorizado con error 403

**Resultado:** Control de acceso por roles implementado correctamente.

### 3. **Validación de Datos** ✅
**Pruebas realizadas:**
- ✅ `POST /api/auth/register` sin campos requeridos → Error 400
- ✅ `POST /api/auth/register` con email duplicado → Error 400
- ✅ `POST /api/auth/login` sin email/contraseña → Error 400
- ✅ Validación de formato de email
- ✅ Validación de longitud mínima de contraseña

**Resultado:** Validación de datos de entrada funcionando.

### 4. **Protección de Rutas** ✅
**Pruebas realizadas:**
- ✅ Rutas públicas (`/api/products`, `/api/health`) accesibles sin autenticación
- ✅ Rutas protegidas (`/api/auth/me`) requieren autenticación
- ✅ Rutas de admin (`/api/admin/*`) requieren rol admin
- ✅ Acceso directo a rutas protegidas sin token → 401

**Resultado:** Sistema de protección de rutas implementado correctamente.

### 5. **Seguridad de Contraseñas** ✅
**Pruebas realizadas:**
- ✅ Contraseñas almacenadas con hash bcrypt (no en texto plano)
- ✅ Verificación de contraseñas con comparePassword
- ✅ Salt rounds configurados para hashing seguro

**Resultado:** Manejo seguro de contraseñas implementado.

### 6. **Pruebas de API con Postman** ✅
**Colección de pruebas ejecutada:**
```http
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
