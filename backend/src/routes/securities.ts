import express from 'express';
const router = express.Router();
import { getStock, getFund, getCertificate } from '../controllers/securities';

router.get('/stock/:avanzaid', getStock);
router.get('/fund/:avanzaid', getFund);
router.get('/certificate/:avanzaid', getCertificate);

export default router;
