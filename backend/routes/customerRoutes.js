import express from 'express';
import {
    createCustomer, getAllCustomers, getCustomerById, updateCustomerById, deleteCustomerById
} from '../controllers/customerController';
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', createCustomer);
router.get('/getall', getAllCustomers);
router.get('/getbyid/:id', getCustomerById);
router.put('/update/:id', updateCustomerById);
router.delete('/delete/:id', deleteCustomerById);

export default router;
