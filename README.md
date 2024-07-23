# Reto técnico Softtek - Swapi

### Configuración inicial - Comandos a ejecutar

Clonar el repositorio para empezar a utilizar la aplicación. Hay que tener instalado [Nodejs](https://nodejs.org/en) y [Serverless](https://www.npmjs.com/package/serverless) de manera global si se quiere probar en local:

```
npm install -g serverless
```

Una vez completada la instalación ingresar a la carpeta y ejecutar el comando:

```
npm install
```

##### El package.json del proyecto cuenta con los siguientes comandos:

1. Comando para compilar generar el build de la aplicación en /dist y correr la aplicación de manera local con serverless:
   ```
   npm start
   ```
2. Comando para correr en desarrollo:
   ```
   sls offline start
   ```
3. Comando para ejecutar las pruebas unitarias de la aplicación en un entorno local:
   ```
   npm test
   ```
4. Comando para desplegar la aplicación en un AWS (Se requiere configuración previa del CLI de serverless):
   ```
   sls deploy
   ```
   Antes de ejecutar el `sls deploy` hay que crear el archivo `.env` en la raiz del proyecto.

```
REGION=${Tu region de uso AWS}
ACCESS_KEY=${Tu Llave de Acceso}
SECRET_KEY=${Tu Clave Secreta}
```

### Documentación Swagger

https://kdy1oztkpd.execute-api.us-east-1.amazonaws.com/api


#### Endpoints:

Obtiene todas los planetas de SWAPI y los traduce:

##### GET: https://kdy1oztkpd.execute-api.us-east-1.amazonaws.com/swapi

Obtiene un planeta de SWAPI y lo traduce:

##### GET: https://kdy1oztkpd.execute-api.us-east-1.amazonaws.com/swapi/:id

Obtiene un planeta de SWAPI y lo traduce. Luego lo crea en la BD:

##### POST: https://kdy1oztkpd.execute-api.us-east-1.amazonaws.com/swapi/:id

---

Crea un planeta de Starwars:

##### POST: https://kdy1oztkpd.execute-api.us-east-1.amazonaws.com/planetas

Obtiene los planetas de Starwars:

##### GET: https://kdy1oztkpd.execute-api.us-east-1.amazonaws.com/planetas

Obtiene un planeta de Starwars:

##### GET: https://kdy1oztkpd.execute-api.us-east-1.amazonaws.com/planetas/:id

Actualiza un planeta de Starwars:

##### PATCH: https://kdy1oztkpd.execute-api.us-east-1.amazonaws.com/planetas/:id

Borra un planeta de Starwars:

##### DELETE: https://kdy1oztkpd.execute-api.us-east-1.amazonaws.com/planetas/:id

#### Lambda:

     app: reto-tecnico-backend-aws-dev-app (37 MB)
