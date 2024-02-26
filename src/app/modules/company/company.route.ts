import express from 'express';
import { CompanyControllers } from './company.controller';

const router = express.Router();

router.get('/suggestions', CompanyControllers.getCompanySuggestions);

export const CompanyRoutes = router;
