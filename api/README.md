# API REST con Clean Architecture

Proyecto de API REST implementada con **Node.js**, **Express** y **TypeScript** siguiendo los principios de **Clean Architecture**.

## 📁 Estructura del Proyecto

```
api/
├── src/
│   ├── domain/                    # Capa de Dominio
│   │   ├── User.ts               # Entidades y DTOs
│   │   └── IUserRepository.ts     # Interfaz del repositorio
│   │
│   ├── application/               # Capa de Aplicación
│   │   ├── GetAllUsersUseCase.ts
│   │   ├── GetUserByIdUseCase.ts
│   │   ├── CreateUserUseCase.ts
│   │   ├── UpdateUserUseCase.ts
│   │   └── DeleteUserUseCase.ts
│   │
│   ├── infrastructure/            # Capa de Infraestructura
│   │   └── UserRepository.ts      # Implementación (en memoria)
│   │
│   ├── interfaces/                # Capa de Interfaces
│   │   └── http/
│   │       ├── UserController.ts  # Controlador HTTP
│   │       └── routes.ts          # Rutas Express
│   │
│   └── index.ts                   # Punto de entrada
│
├── package.json
├── tsconfig.json
└── README.md
```

## 🏗️ Capas de Clean Architecture

### 1. **Domain** (Dominio)
- **Responsabilidad:** Contiene las entidades del negocio y las interfaces.
- **Independencia:** No depende de ninguna otra capa.
- **Archivos:**
  - `User.ts`: Define la entidad `User` y sus DTOs
  - `IUserRepository.ts`: Contrato que debe cumplir el repositorio

### 2. **Application** (Aplicación)
- **Responsabilidad:** Casos de uso / Lógica de negocio.
- **Cada UseCase:** Encapsula una acción específica (crear, obtener, actualizar, eliminar).
- **Validaciones:** Las reglas de negocio se validan aquí.
- **Archivos:**
  - `GetAllUsersUseCase.ts`
  - `GetUserByIdUseCase.ts`
  - `CreateUserUseCase.ts`
  - `UpdateUserUseCase.ts`
  - `DeleteUserUseCase.ts`

### 3. **Infrastructure** (Infraestructura)
- **Responsabilidad:** Implementación técnica de los repositorios.
- **Detalles:** Aquí irían conexiones a bases de datos reales.
- **Actual:** Base de datos simulada en memoria con `Map<string, User>`.
- **Archivos:**
  - `UserRepository.ts`: Implementa `IUserRepository`

### 4. **Interfaces** (Interfaces)
- **Responsabilidad:** Adaptar las peticiones HTTP a casos de uso.
- **Controllers:** Manejan las peticiones HTTP.
- **Routes:** Definen los endpoints.
- **Archivos:**
  - `UserController.ts`: Maneja las peticiones HTTP
  - `routes.ts`: Define los endpoints

## 🔄 Flujo Completo: Request → Response

```
        HTTP Request
            ↓
    [Express Router]
            ↓
    [UserController] ← maneja la petición HTTP
            ↓
    [Use Case] ← ejecuta la lógica de negocio
            ↓
    [UserRepository] ← accede a los datos
            ↓
    [Base de datos]
            ↓
    [Respuesta]
            ↓
        HTTP Response
```

### Ejemplo paso a paso: GET /api/users/123

1. **Request HTTP llega:** `GET /api/users/123`
2. **Router de Express** lo identifica y lo envía a `UserController.getById()`
3. **UserController** extrae el parámetro `id='123'` de `req.params`
4. **Llama a** `getUserByIdUseCase.execute(id)`
5. **Use Case** valida el ID y llama a `userRepository.getById('123')`
6. **Repository** busca en la BD en memoria y retorna el usuario o `null`
7. **Use Case** retorna el resultado al Controller
8. **Controller** genera la respuesta HTTP JSON con status 200/404
9. **Response HTTP** retorna al cliente

## 📝 Endpoints Disponibles

### 1. GET /api/users
**Obtener todos los usuarios**

```bash
# Simple
curl http://localhost:3001/api/users

# Con query params (paginación)
curl "http://localhost:3001/api/users?limit=2&offset=0"
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "abc-123",
      "name": "Santiago Rodriguez",
      "email": "santiago@example.com",
      "createdAt": "2024-01-15T00:00:00.000Z"
    }
  ],
  "total": 3,
  "limit": 2,
  "offset": 0
}
```

---

### 2. GET /api/users/:id
**Obtener un usuario por ID**

```bash
# Reemplaza {id} con un ID real
curl http://localhost:3001/api/users/abc-123

# O en Postman:
# URL: http://localhost:3001/api/users/abc-123
# Method: GET
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": "abc-123",
    "name": "Santiago Rodriguez",
    "email": "santiago@example.com",
    "createdAt": "2024-01-15T00:00:00.000Z"
  }
}
```

**Error - No encontrado (404):**
```json
{
  "success": false,
  "error": "User not found"
}
```

---

### 3. POST /api/users
**Crear un nuevo usuario**

```bash
# Con curl
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }'
```

**Body (JSON):**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "new-uuid-123",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "createdAt": "2024-01-26T10:30:00.000Z"
  }
}
```

**Error - Validación fallida (400):**
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

---

### 4. PUT /api/users/:id
**Actualizar un usuario**

```bash
# Con curl
curl -X PUT http://localhost:3001/api/users/abc-123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Santiago Actualizado",
    "email": "santiago-nuevo@example.com"
  }'
```

**Body (JSON) - Los campos son opcionales:**
```json
{
  "name": "Nuevo Nombre",
  "email": "newemail@example.com"
}
```

O solo actualizar el nombre:
```json
{
  "name": "Solo Nombre"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "abc-123",
    "name": "Santiago Actualizado",
    "email": "santiago-nuevo@example.com",
    "createdAt": "2024-01-15T00:00:00.000Z"
  }
}
```

---

### 5. DELETE /api/users/:id
**Eliminar un usuario**

```bash
# Con curl
curl -X DELETE http://localhost:3001/api/users/abc-123
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Error - No encontrado (404):**
```json
{
  "success": false,
  "error": "User not found"
}
```

---

## 📌 Parámetros vs Query Parameters

### Path Parameters (Parámetros)
Forman parte de la URL. **Se usan para identificar recursos.**

```
GET /api/users/:id
       └─ parámetro
```

```bash
# Ejemplo
curl http://localhost:3001/api/users/abc-123
                                       └─ valor del parámetro
```

En el código:
```typescript
const { id } = req.params;  // id = "abc-123"
```

---

### Query Parameters (Parámetros de consulta)
Vienen en la query string. **Se usan para filtrar, paginar, ordenar.**

```
GET /api/users?limit=10&offset=0
      └─ query parameters
```

```bash
# Ejemplo
curl "http://localhost:3001/api/users?limit=2&offset=1"
                                       └─── query string
```

En el código:
```typescript
const limit = req.query.limit;   // limit = "2"
const offset = req.query.offset; // offset = "1"
```

---

## 🧪 Cómo Probar con Postman

### Instalación
1. Descarga [Postman](https://www.postman.com/downloads/)
2. Abre la aplicación

### Crear una solicitud GET (obtener todos)

1. **Click en** "+" para crear nueva solicitud
2. **Method:** GET
3. **URL:** `http://localhost:3001/api/users`
4. **Click** "Send"

### Crear una solicitud POST (crear usuario)

1. **Click en** "+" para crear nueva solicitud
2. **Method:** POST
3. **URL:** `http://localhost:3001/api/users`
4. **Tab "Body"** → selecciona **"raw"**
5. **Dropdown a la derecha:** selecciona **"JSON"**
6. **En el editor:** pega esto:
```json
{
  "name": "Carlos López",
  "email": "carlos@example.com"
}
```
7. **Click** "Send"

### Crear una solicitud PUT (actualizar)

1. **Method:** PUT
2. **URL:** `http://localhost:3001/api/users/abc-123`
   - Reemplaza `abc-123` con un ID real
3. **Tab "Body"** → **"raw"** → **"JSON"**
4. **En el editor:**
```json
{
  "name": "Carlos López Actualizado",
  "email": "carlos-nuevo@example.com"
}
```
5. **Click** "Send"

### Crear una solicitud DELETE

1. **Method:** DELETE
2. **URL:** `http://localhost:3001/api/users/abc-123`
3. **Click** "Send"

---

## 🖥️ Cómo Probar con cURL

cURL es una herramienta de línea de comandos para hacer peticiones HTTP.

### GET - Obtener todos
```bash
curl http://localhost:3001/api/users
```

### GET - Obtener con query params
```bash
curl "http://localhost:3001/api/users?limit=2&offset=0"
```

### GET - Obtener uno por ID
```bash
curl http://localhost:3001/api/users/abc-123
```

### POST - Crear usuario
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana García","email":"ana@example.com"}'
```

**Explicación:**
- `-X POST`: especifica método POST
- `-H "Content-Type: application/json"`: header indicando que envías JSON
- `-d '{...}'`: el body de la petición

### PUT - Actualizar usuario
```bash
curl -X PUT http://localhost:3001/api/users/abc-123 \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana García Actualizada","email":"ana-nueva@example.com"}'
```

### DELETE - Eliminar usuario
```bash
curl -X DELETE http://localhost:3001/api/users/abc-123
```

### Guardar respuesta en archivo
```bash
curl http://localhost:3001/api/users > usuarios.json
```

---

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias
```bash
cd api
npm install
```

### 2. Ejecutar en desarrollo
```bash
npm run dev
```

Verás algo como:
```
╔════════════════════════════════════════════════════════════╗
║         API REST con Clean Architecture                   ║
║         Servidor escuchando en puerto 3001                ║
║         http://localhost:3001                             ║
╚════════════════════════════════════════════════════════════╝
```

### 3. Compilar a JavaScript
```bash
npm run build
```

Genera la carpeta `dist/` con archivos `.js` compilados.

### 4. Ejecutar versión compilada
```bash
npm start
```

---

## 💡 Validaciones Implementadas

### Email
- Formato válido: `nombre@dominio.com`
- Ejemplo inválido: `correo@`, `@dominio`, `sin punto`

### Usuario (Create)
- `name`: obligatorio, no vacío
- `email`: obligatorio, formato válido

### Usuario (Update)
- Al menos uno de los campos debe estar presente
- Si se proporciona email, debe ser válido

### ID
- Obligatorio para obtener, actualizar y eliminar

---

## 🔍 Ventajas de Clean Architecture

✅ **Separación de responsabilidades** - Cada capa tiene su función clara
✅ **Testeable** - Fácil de hacer testing unitario
✅ **Mantenible** - Cambios aislados a una capa
✅ **Escalable** - Fácil agregar nuevas funcionalidades
✅ **Independencia de frameworks** - Lógica desacoplada de Express
✅ **Reutilizable** - Casos de uso pueden usarse en diferentes interfaces (REST, GraphQL, CLI, etc)

---

## 📚 Estructura de una solicitud HTTP

```
REQUEST:
┌─────────────────────────────────────┐
│ POST /api/users                     │  ← Método + Ruta
│ Host: localhost:3001                │  ← Headers
│ Content-Type: application/json      │
│ Content-Length: 45                  │
│                                     │
│ {                                   │  ← Body
│   "name": "Juan",                   │
│   "email": "juan@example.com"       │
│ }                                   │
└─────────────────────────────────────┘

RESPONSE:
┌─────────────────────────────────────┐
│ HTTP/1.1 201 Created                │  ← Status
│ Content-Type: application/json      │  ← Headers
│ Content-Length: 120                 │
│                                     │
│ {                                   │  ← Body
│   "success": true,                  │
│   "message": "User created",        │
│   "data": {                         │
│     "id": "uuid",                   │
│     "name": "Juan",                 │
│     "email": "juan@example.com"     │
│   }                                 │
│ }                                   │
└─────────────────────────────────────┘
```

---

## 📖 HTTP Status Codes Usados

| Código | Significado | Cuándo |
|--------|------------|--------|
| 200 | OK | GET, PUT, DELETE exitosos |
| 201 | Created | POST exitoso (recurso creado) |
| 400 | Bad Request | Validación fallida |
| 404 | Not Found | Usuario no encontrado |
| 500 | Internal Server Error | Error del servidor |

---

## 🎯 Próximos Pasos (Mejoras Futuras)

- [ ] Conectar a base de datos real (MongoDB o PostgreSQL)
- [ ] Agregar autenticación JWT
- [ ] Agregar validaciones más robustas
- [ ] Implementar logging completp
- [ ] Agregar tests unitarios y de integración
- [ ] Documentación con Swagger/OpenAPI
- [ ] Docker para containerización

---

¡Éxito con tu API REST! 🚀
