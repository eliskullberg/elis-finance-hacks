import express from 'express';
import { getSubscriptionRight } from '../controllers/subscriptionRight';
const router = express.Router();
import apiKeyAuth from '../middleware/apiKeyAuth';

router.get('/', apiKeyAuth, getSubscriptionRight);

export default router;
