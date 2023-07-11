import express from 'express';
import { getSubscriptionRight } from '../controllers/subscriptionRight';
const router = express.Router();

router.get('/', getSubscriptionRight);

export default router;
