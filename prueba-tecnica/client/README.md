# API de Gestión de Clientes

Esta API proporciona endpoints para gestionar clientes, permitiendo obtener todos los clientes y buscar clientes filtrados.

#### Instalar Dependencias

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en tu terminal:

**pnpm install**

Ejecutar el Proyecto
Para ejecutar el proyecto, puedes usar el siguiente comando:

**pnpm run dev** o **npm run dev**

## Vistas Disponibles

### Obtener Todos los Clientes

Es una vista que muestra a todos los clientes almacenados en la base de datos, con scroll infinito.

### Buscar Clientes

Es una vista que busca a los clientes almacenados en la base de datos, y como referencia usa al `First Name`, `Last Name` `City`, `Email` y `Subscription Date`. Un solo input que permita buscar en todos los campos mencionados, si la busqueda tiene muchos elementos se iran mostrando de 10 en 10 con scroll infinito.
