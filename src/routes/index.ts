import { 
  Router
} from 'express';
import { FriendControllers } from '../controllers/FriendController';
import { UserControllers } from '../controllers/UserControllers';

const routes = Router();

const userControllers = new UserControllers();
const friendControllers = new FriendControllers();

routes.get('/', (request, response) => {
  const { userName } = request.body;
  response.json({ ok: true });
});

routes.post('/user', userControllers.create)

routes.post('/friend', friendControllers.create)

export default routes;