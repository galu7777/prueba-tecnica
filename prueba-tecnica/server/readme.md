# API de Gestión de Clientes

Esta API proporciona endpoints para gestionar clientes, permitiendo obtener todos los clientes y buscar clientes filtrados.

#### Instalar Dependencias

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en tu terminal:

**pnpm install**

### Variables de Entorno

Crea un archivo .env en la raíz del proyecto y configura las siguientes variables de entorno según tus necesidades:

DB_USER=postgres
DB_PASSWORD=12345
DB_HOST=localhost
DB_NAME=tec_prueba
PORT=3001
CSV_FILE_PATH=C:/Users/Anonymus/Desktop/carpetas/Programacion/Next/prueba-tecnica/data/customers-100000.csv

Asegúrate de ajustar CSV_FILE_PATH para que apunte al directorio donde se encuentra tu archivo CSV.

Ejecutar el Proyecto
Para ejecutar el proyecto, puedes usar el siguiente comando:

**npm start**

## Endpoints Disponibles

### Obtener Todos los Clientes

Este endpoint devuelve todos los clientes almacenados en la base de datos, con soporte para paginación.

- **URL:** `GET /api/v1/netsocs/customers/get_all_customer`
- **Paginación:** Este endpoint soporta paginación mediante el uso de los parámetros de consulta `page` y `limit`.

Ejemplo de solicitud:
**GET /api/v1/netsocs/customers/get_all_customer?page=1&limit=10**

### Buscar Clientes

Este endpoint permite buscar clientes filtrados por término de búsqueda, con soporte para paginación.

- **URL:** `GET /api/v1/netsocs/customers/search_customer`
- **Parámetros de consulta:**
  - `searchTerm`: Término de búsqueda para filtrar clientes. Puede ser un nombre, apellido, ciudad, email o fecha de suscripción.
  - `page`: (Opcional) Número de página deseada para la paginación.
  - `limit`: (Opcional) Cantidad de resultados por página.

Ejemplo de solicitud para buscar clientes con el término "John":
**GET /api/v1/netsocs/customers/search_customer?searchTerm=John&page=1&limit=10**
