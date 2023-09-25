# fullstack_app

**Descripción:** Este es un proyecto para la creacion de un videojuego. 
## Instrucciones de Configuración
1. Clona el repositorio.
2. Ejecuta `npm i` para instalar las dependencias.
3. Inicia el servidor con `npm start`.

## Enlaces Útiles
- [Thunder Collection (FullStack)](https://github.com/defe3a/fullstack_app/blob/main/thunder-collection_FullStack.json): Colección Thunder para hacer llamadas a los endpoints.

## Autenticación
Algunos endpoints requieren autorización. Para simular el inicio de sesión:
1. Crea un usuario.
2. Llama al endpoint de autenticación (`/api/auth/login`) para obtener un token.
3. El token tiene una duración de 1 hora.

## Dependencias
- **nodemon:** Habilita el hot reload para facilitar el desarrollo.
- **cors:** Habilita CORS.
- **express:** Framework para facilitar el desarrollo.
- **mongoose:** Biblioteca para interactuar con MongoDB.
- **jsonwebtoken:** Utilizado para la autenticación con tokens.

---
**Autor:** Federico Trezza
