import { Request, Response } from 'express';
import { Customer } from '../db';
import jsonResponse from '../utils/jsonResponse';

const ITEMS_PER_PAGE = 10;

const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = req.query.page ? parseInt(req.query.page as string) : 1;

        const totalCount = await Customer.count();
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        const offset = (page - 1) * ITEMS_PER_PAGE;

        const customers = await Customer.findAll({
            limit: ITEMS_PER_PAGE,
            offset: offset,
        });

        const paginationInfo = {
            totalItems: totalCount,
            totalPages: totalPages,
            currentPage: page,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        };

        return jsonResponse(res, 200, { customers, paginationInfo });
    } catch (error: any) {
        console.error('Error: ', error.message);
        return jsonResponse(res, 500, `Internal Server Error ${error.message}`);
    }
};

export default getAllCustomers;
