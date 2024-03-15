import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Customer } from '../db';
import jsonResponse from '../utils/jsonResponse';

const searchCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const searchTerm: string = req.query.searchTerm as string;
        const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
        const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 10;

        // Expresión regular para verificar el formato de fecha válido (YYYY-MM-DD HH:MM:SS)
        const validDateFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}-\d{2}$/;

        let filteredCustomers;

        if (validDateFormat.test(searchTerm)) {
            // Si searchTerm tiene un formato de fecha válido, buscar por subscriptionDate
            filteredCustomers = await Customer.findAndCountAll({
                where: {
                    subscriptionDate: searchTerm
                },
                limit: limit,
                offset: (page - 1) * limit
            });
        } else {
            // Si searchTerm no es una fecha válida, buscar en otros campos
            filteredCustomers = await Customer.findAndCountAll({
                where: {
                    [Op.or]: [
                        { firstName: { [Op.iLike]: `%${searchTerm}%` } },
                        { lastName: { [Op.iLike]: `%${searchTerm}%` } },
                        { city: { [Op.iLike]: `%${searchTerm}%` } },
                        { email: { [Op.iLike]: `%${searchTerm}%` } }
                    ]
                },
                limit: limit,
                offset: (page - 1) * limit
            });
        }

        const totalCustomers = filteredCustomers.count;
        const totalPages = Math.ceil(totalCustomers / limit);

        const prevPage = page > 1 ? page - 1 : null;
        const nextPage = page < totalPages ? page + 1 : null;

        const response = {
            message: 'Success',
            filteredCustomers: filteredCustomers.rows,
            pagination: {
                totalCustomers: totalCustomers,
                totalPages: totalPages,
                currentPage: page,
                prevPage: prevPage,
                nextPage: nextPage
            }
        };

        return jsonResponse(res, 200, response);
    } catch (error: any) {
        console.error('Error: ', error.message);
        return jsonResponse(res, 500, `Internal Server Error ${error.message}`);
    }
};

export default searchCustomers;
