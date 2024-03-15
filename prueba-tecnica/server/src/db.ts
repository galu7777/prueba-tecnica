import { config } from 'dotenv';
import { Sequelize, Model, ModelCtor, DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';
import Customer from './models/Customer'; // Importa directamente la instancia de Customer

config();

const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false,
    native: false,
    // dialectOptions: {
    //     // Establece el tiempo de espera en milisegundos (por ejemplo, 30 segundos)
    //     connectionTimeout: 600000
    // }
});

const basename = path.basename(__filename);

// Inyecta la conexión (sequelize) directamente al modelo Customer
Customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        customerId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        phone1: {
            type: DataTypes.STRING,
        },
        phone2: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        subscriptionDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        website: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Customer', // Nombre del modelo
    }
);

// Capitaliza el nombre del modelo
const modelName = Customer.name.charAt(0).toUpperCase() + Customer.name.slice(1);
const convertedModels: { [key: string]: ModelCtor<Model<any, any>> } = {
    [modelName]: Customer,
};

// Asigna los modelos convertidos a sequelize.models
Object.assign(sequelize.models, convertedModels);

// Aquí vendrían las relaciones entre modelos si es necesario

export { sequelize as conn, Customer };
