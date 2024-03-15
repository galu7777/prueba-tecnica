import { Router } from "express";
import getAllCustomers from "../controllers/getAllCustomers";
import searchCustomers from "../controllers/searchCustomers";

const router = Router();

router.get('/customers/get_all_customer', getAllCustomers)
router.get('/customers/search_customer', searchCustomers)

export default router;