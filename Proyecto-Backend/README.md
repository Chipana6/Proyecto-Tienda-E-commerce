# 👜 Proyecto Backend - API REST Tienda de Carteras

Backend desarrollado con **Node.js**, **TypeScript**, **Express** y **MongoDB**, diseñado para la **gestión de usuarios y productos** de una tienda en línea de carteras.

---

## 🚀 Características principales

- Autenticación segura con **JWT (JSON Web Token)**  
- Encriptación de contraseñas con **bcryptjs**  
- CRUD completo para el módulo de **productos**  
- Conexión a base de datos **MongoDB** mediante **Mongoose**  
- Uso de **TypeScript** para mayor seguridad en el código  
- Estructura modular y mantenible  
- Variables de entorno con **dotenv**  
- Documentado y probado con **Postman**

---

## 🛠️ Tecnologías Utilizadas
CATEGORIA	TECNOLOGIA
BACKEND	NODE.JS, EXPRESS.JS, TYPERSCRYPT
BASE DE DATOS	MONGODB, MONGOOSE
AUTENTICACION	JWT, BCRYPTJS
CONFIGURACION	DOTENV
DESARROLLO	TS-NODE-DEV

## ⚙️ Instalación y Configuración

### 🔹 Prerrequisitos
- Node.js v18 o superior  
- MongoDB instalado localmente o en la nube  
- Postman o una herramienta similar para probar los endpoints  

---

### 🔹 Pasos para instalar y ejecutar

1. **Entrar en la carpeta del proyecto**
   ```bash
   cd Proyecto-Backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/proyecto_carteras
   JWT_SECRET=claveSuperSegura123
   JWT_EXPIRES_IN=1d
   ```

4. **Iniciar el servidor**
   ```bash
   npm run dev
   ```

   Si todo está correcto, deberías ver en la consola:
   ```
   🚀 Servidor ejecutándose en el puerto 5000
   ✅ Conectado a MongoDB
   ```

---

## 📡 Endpoints principales

### 🧍‍♂️ Autenticación y Usuarios

#### `POST /api/auth/register`
Registrar un nuevo usuario.  
**Body:**
```json
{
  "name": "Cristian",
  "email": "cristian@gmail.com",
  "password": "123456"
}
```

#### `POST /api/auth/login`
Iniciar sesión y obtener un token JWT.  
**Body:**
```json
{
  "email": "cristian@gmail.com",
  "password": "123456"
}
```

#### `GET /api/users`
Obtener la lista de usuarios registrados.  
🔒 **Requiere autenticación (token JWT)**  
**Header:**
```
Authorization: Bearer <tu_token_valido>
```

---

### 👜 Productos

#### `GET /api/products`
Lista todos los productos.

#### `POST /api/products`
Crea un nuevo producto (requiere token JWT).  
**Body:**
```json
{
  "name": "Cartera de cuero",
  "price": 120,
  "description": "Cartera artesanal de alta calidad"
}
```

#### `PUT /api/products/:id`
Actualiza un producto existente.

#### `DELETE /api/products/:id`
Elimina un producto por su ID.

---



