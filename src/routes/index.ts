import { 
  Router
} from 'express';
import { UserControllers } from '../controllers/UserControllers';

const routes = Router();

const userControllers = new UserControllers();

routes.get('/', (request, response) => {
  const { userName } = request.body;
  response.json({ ok: true });
});

routes.post('/user', userControllers.create)

export default routes;