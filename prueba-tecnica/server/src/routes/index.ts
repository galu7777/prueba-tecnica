import { Router } from "express";
import getAllCustomers from "../controllers/getAllCustomers";
import searchCustomers from "../controllers/searchCustomers";

const router = Router();

router.get('/api/v1/netsocs/customers/get_all_customer', getAllCustomers)
router.get('/api/v1/netsocs/customers/search_customer', searchCustomers)

export default router;