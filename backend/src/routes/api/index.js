import { Router } from 'express';
import scoreCardRouter from './when2meet';

const router = Router();

router.use('/', scoreCardRouter);

export default router;
