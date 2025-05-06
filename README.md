# Conexa Backend - Instrucciones de Inicio

¡Hola! 👋 Gracias por dedicarle tiempo a revisar este proyecto. Entiendo que evaluar a varios candidatos puede ser complejo, y valoro mucho que estés leyendo este README con atención, ¡incluso este pequeño mensaje personal!

Mi nombre es Jonathan Rubio, y he dedicado varias semanas a construir esta base, buscando un equilibrio entre sencillez y funcionalidades importantes como documentación clara y logs con Winston.

Puede que esta prueba no cumpla con todos los requisitos al pie de la letra, ya que soy desarrollador backend con 4 años de experiencia y durante el desarrollo surgieron varias tareas urgentes de mi sprint actual.

Aun así, agradezco sinceramente que explores el resultado de mi aprendizaje. Espero que lo que veas te parezca interesante y, más allá de la prueba en sí, ¡me encantaría tener la oportunidad de charlar sobre el lenguaje y la tecnología!

¡Que tengas un excelente día y espero tengamos la oportunidad de conversar pronto!

---

Este documento explica cómo iniciar el proyecto Conexa Backend, tanto localmente como utilizando Docker.

## Pre-requisitos

* **Node.js y npm:** Necesarios para la ejecución local. Puedes descargarlos desde [https://nodejs.org/](https://nodejs.org/).
* **Docker:** Necesario para la ejecución con contenedores. Puedes descargarlo desde [https://www.docker.com/](https://www.docker.com/).

## Configuración Inicial de la Base de Datos

**Importante:** Para obtener correctamente las tablas de la base de datos en tu entorno, sigue estos pasos la primera vez que inicies el proyecto:

1.  **Accede al archivo `database.module.ts`:** Navega hasta la ubicación de este archivo dentro de la estructura de tu proyecto.
2.  **Modifica las flags de sincronización:**
    * Cambia la línea `synchronize: false` a `synchronize: true`.
    * Cambia la línea `autoLoadEntities: false` a `autoLoadEntities: true`.
3.  **Ejecuta el proyecto localmente o con Docker:** Esto forzará a TypeORM (tu ORM) a sincronizar las entidades (modelos) con la base de datos, creando las tablas necesarias.
4.  **Revierte las flags (opcional pero recomendado):** Una vez que las tablas hayan sido creadas correctamente, puedes volver a cambiar las flags en `database.module.ts` a sus valores originales (`synchronize: false`, `autoLoadEntities: false`). Esto evitará que TypeORM intente modificar la base de datos en ejecuciones posteriores.

## Ejecución Local (Sin Docker)

Para ejecutar el proyecto localmente, asegúrate de cumplir con los siguientes requisitos:

1.  **Verificar archivos de entorno:**
    * **`.env`:** Asegúrate de que exista un archivo `.env` en la raíz del proyecto con la configuración base.
    * **`.env.local`:** Asegúrate de que exista un archivo `.env.local` en la raíz del proyecto. Este archivo contendrá las variables de conexión a tu base de datos externa local.

2.  **Configurar conexión a la base de datos externa:** Edita el archivo `.env.local` y proporciona los detalles de conexión a tu base de datos externa (sin Docker). Esto incluye host, puerto, usuario, contraseña y nombre de la base de datos.

3.  **Ejecutar el comando de inicio local:** Abre tu terminal en la raíz del proyecto y ejecuta el siguiente comando:

    ```bash
    npm run start:local
    ```

    Este comando iniciará el servidor backend utilizando la configuración definida en el archivo `.env.local`. **Si la ejecución local es exitosa, podrás acceder a la documentación de Swagger a través del siguiente enlace en tu navegador:**

    ```
    http://localhost:4002/api
    ```

## Ejecución con Docker

Para ejecutar el proyecto utilizando Docker, asegúrate de tener Docker instalado en tu sistema.

1.  **Verificar archivos de entorno:** Asegúrate de que exista un archivo `.env` en la raíz del proyecto con la configuración base. No es necesario un archivo `.env.local` para la ejecución con Docker, ya que la configuración de la base de datos se gestiona dentro de los contenedores.

2.  **Ejecutar Docker Compose:** Abre tu terminal en la raíz del proyecto y ejecuta el siguiente comando:

    ```bash
    docker compose up --build
    ```

    Este comando realizará las siguientes acciones:

    * **`--build`:** Construirá las imágenes Docker para la base de datos y el backend del proyecto (si las imágenes no existen o han cambiado).
    * **`up`:** Iniciará los contenedores definidos en tu archivo `docker-compose.yml`, incluyendo la base de datos y el backend.

    Una vez que este proceso termine y **si la instalación de las imágenes y el inicio de los contenedores son correctos, podrás acceder a la documentación de Swagger a través del siguiente enlace en tu navegador:**

    ```
    http://localhost:4002/api
    ```

¡Listo! Con estas instrucciones, deberías poder iniciar el proyecto Conexa Backend tanto en tu entorno local como utilizando Docker. Recuerda seguir los pasos para la configuración inicial de la base de datos la primera vez que ejecutes el proyecto.