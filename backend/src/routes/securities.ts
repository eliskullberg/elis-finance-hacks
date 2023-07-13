import express from 'express';
const router = express.Router();
import { getStock, getFund, getCertificate } from '../controllers/securities';
import apiKeyAuth from '../middleware/apiKeyAuth';

router.get('/stock/:avanzaid', apiKeyAuth, getStock);
router.get('/fund/:avanzaid', apiKeyAuth, getFund);
router.get('/certificate/:avanzaid', apiKeyAuth, getCertificate);

export default router;
