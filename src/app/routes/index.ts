import { Router } from 'express';
import { CompanyRoutes } from '../modules/company/company.route';

const router = Router();

//add new route in here
const moduleRoutes = [
  {
    path: '/companies',
    route: CompanyRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
