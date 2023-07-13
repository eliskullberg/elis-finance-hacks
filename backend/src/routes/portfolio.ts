import express from 'express';
import { getPortfolio } from '../controllers/portfolio';
import apiKeyAuth from '../middleware/apiKeyAuth';
const router = express.Router();

router.get('/', apiKeyAuth, getPortfolio);

export default router;
