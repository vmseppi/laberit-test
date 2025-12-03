# User Management App

Aplicación de gestión de usuarios con React, TypeScript y Vite.

## 📋 Requisitos

- Node.js 18 o superior
- npm

## 📥 Clonar el Repositorio

Para clonar este repositorio, usa HTTPS:

```bash
git clone https://github.com/vmseppi/laberit-test.git
```

## 🚀 Instalación Rápida

### Paso 1: Instalar dependencias

```bash
npm install
```

Si hay errores, usa:

```bash
npm install --legacy-peer-deps
```

### Paso 2: Configurar API Key (Importante)

Para evitar errores de CORS, necesitas obtener una API key de ReqRes:

1. Ve a https://app.reqres.in/api-keys
2. Crea una cuenta o inicia sesión
3. Genera una nueva API key
4. Crea un archivo `.env` en la raíz del proyecto
5. Agrega tu API key al archivo:

```bash
VITE_REQRES_API_KEY=tu_api_key_aqui
```

**Ejemplo de archivo `.env`:**
```
VITE_REQRES_API_KEY=reqres_abc123xyz456
```

### Paso 3: Ejecutar el proyecto

```bash
npm run dev
```

Abre tu navegador en: `http://localhost:5173`

## 📜 Comandos

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Crear build de producción
npm test         # Ejecutar tests
npm run lint     # Verificar código
```

## 🐛 Problemas Comunes

**Error de dependencias:**
```bash
npm install --legacy-peer-deps
```

**Puerto ocupado:**
Vite usará automáticamente otro puerto.

## 📝 Notas

- La API de ReqRes es de prueba (no persiste cambios)
- El proyecto usa proxy y API key para evitar errores de CORS
- **Importante:** El archivo `.env` debe tener una API key generada por cada usuario que descargue el repo por motivos de seguridad
- Si no configuras la API key, el proyecto puede tener errores de CORS

---

