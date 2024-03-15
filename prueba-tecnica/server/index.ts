import server from "./src/server";
import { conn } from './src/db';
import saveDataFromCSV from './src/helpers/saveDataFromCSV'; // Importa la función saveDataFromCSV desde su archivo
const { PORT, CSV_FILE_PATH } = process.env;

const CSVFilePath = CSV_FILE_PATH || "../data/customers-100000.csv"

conn.sync({ alter: true }).then(async () => {
    
    // Inicia el servidor
    server.listen(PORT, () => {
        console.log(`🚀 Server listening on port ${PORT} 🚀`);
    });
    // Guarda los datos del CSV en la base de datos
    await saveDataFromCSV(CSVFilePath);
}).catch((error: Error) => console.error(error));
