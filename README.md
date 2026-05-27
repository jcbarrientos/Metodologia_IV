# InvestigaEnf 🩺
**Herramienta interactiva de Metodología de Investigación en Enfermería**  
Capítulo 4 · 2.º año de Licenciatura en Enfermería

---

## ¿Qué incluye?

### Módulo 1 — Asistente de Perfil de Investigación (IA)
Chat guiado que ayuda al estudiante a construir su perfil de investigación paso a paso:
- Problema de investigación
- Objetivo general y 3 objetivos específicos
- Enfoque, tipo y diseño
- Hipótesis (o justificación de por qué no corresponde)

### Módulo 2 — 5 Actividades de Aprendizaje
1. **¿Correcto o incorrecto?** — Identifica errores en problemas de investigación
2. **Conecta con su diseño** — Drag & drop: asigna preguntas a diseños metodológicos
3. **El caso de Roxana** — Analiza y corrige el perfil con errores del capítulo (con retroalimentación por IA)
4. **Clasifica las variables** — Función y escala de medición
5. **Trivia del proceso** — Opción múltiple sobre las fases del proceso científico

---

## Estructura del proyecto

```
investigacion-enfermeria/
├── index.html        ← Toda la interfaz de la app
├── vercel.json       ← Configuración de Vercel
├── README.md         ← Este archivo
└── api/
    └── chat.js       ← Función serverless (proxy seguro para Gemini API)
```

---

## Cómo hacer el deploy

### Paso 1 — Obtener API Key de Gemini (gratis)
1. Ve a https://aistudio.google.com/app/apikey
2. Inicia sesión con tu cuenta Google
3. Clic en **"Create API key"** → copia la key (empieza con `AIza...`)

### Paso 2 — Subir a GitHub
1. Crea un repositorio nuevo en https://github.com/new
2. Sube todos los archivos de esta carpeta al repositorio
   - Puedes usar GitHub Desktop o los comandos:
     ```bash
     git init
     git add .
     git commit -m "Primera versión InvestigaEnf"
     git branch -M main
     git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
     git push -u origin main
     ```

### Paso 3 — Deploy en Vercel
1. Ve a https://vercel.com y crea una cuenta (gratis) con tu GitHub
2. Clic en **"Add New → Project"**
3. Importa tu repositorio de GitHub
4. Antes de hacer deploy, en la sección **"Environment Variables"** agrega:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** tu key de Google AI Studio
5. Clic en **Deploy**

¡Listo! Vercel te dará una URL pública como `https://investiga-enf.vercel.app`

### Actualizaciones futuras
Cada vez que hagas `git push` al repositorio, Vercel redespliega automáticamente.

---

## Personalización
- Para cambiar preguntas de los juegos: edita los arrays `gameErrores`, `gameDiseños`, `gameVariables`, `gameTrivia` en `index.html`
- Para ajustar el comportamiento del asistente: edita la constante `CHAT_SYSTEM` en `index.html`
- El tier gratuito de Gemini permite **1,500 requests/día**

---

## Tecnologías
- HTML / CSS / JavaScript puro (sin frameworks)
- Gemini 1.5 Flash API (Google AI)
- Vercel Serverless Functions
