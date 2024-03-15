import fs from "fs";
import { parse } from 'csv-parse';
import Customer from "../models/Customer";

// Función para guardar los datos del CSV en la base de datos de forma lenta
async function saveDataFromCSV(filePath: string): Promise<void> {
    try {
        const csvData = fs.readFileSync(filePath, "utf-8");

        // Parsear el CSV y guardar los registros en un array
        const records = await new Promise<any[]>((resolve, reject) => {
            parse(csvData, { columns: true, skip_empty_lines: true }, (err, records) => {
                if (err) {
                    console.error("Error parsing CSV:", err);
                    reject(err);
                    return;
                }
                resolve(records);
            });
        });

        // Obtener el último ID de cliente de la base de datos
        const lastCustomer = await Customer.findOne({
            order: [['id', 'DESC']],
            attributes: ['id'],
            raw: true,
        });

        let lastCustomerId = 0;
        if (lastCustomer) {
            lastCustomerId = lastCustomer.id;
        }

        // Verificar si el último registro del CSV ya está en la base de datos
        const lastRecord = records[records.length - 1];
        const lastRecordIndex = parseInt(lastRecord["Index"]);
        if (lastRecordIndex === lastCustomerId) {
            console.log("Todos los registros del CSV ya están en la base de datos.");
            return; // No es necesario cargar más registros
        }

        // Procesar cada registro con un retraso entre ellos
        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            try {
                await Customer.create({
                    customerId: record["Customer Id"],
                    firstName: record["First Name"],
                    lastName: record["Last Name"],
                    company: record["Company"],
                    city: record["City"],
                    country: record["Country"],
                    phone1: record["Phone 1"],
                    phone2: record["Phone 2"],
                    email: record["Email"],
                    subscriptionDate: new Date(record["Subscription Date"]),
                    website: record["Website"],
                });
                console.log("New customer created at index:", i);
                await sleep(10); // Esperar 10 milisegundos antes de procesar el siguiente registro
            } catch (error) {
                console.error("Error saving data from CSV:", error);
            }
        }

        console.log("All data saved successfully.");
    } catch (error) {
        console.error("Error saving data from CSV:", error);
        throw error;
    }
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default saveDataFromCSV;
