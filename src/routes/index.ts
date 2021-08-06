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
routes.get('/user/:userName', userControllers.loadAllUsers)

routes.get('/friend/list/:userName', friendControllers.findFriendsByUser)
routes.get('/friend/list/solicitation/:userName', friendControllers.findAllPendingByUser)
routes.post('/friend', friendControllers.create)
routes.get('/friend/accept/:id', friendControllers.acceptRequest)
routes.get('/friend/reject/:id', friendControllers.undoFriendship)

export default routes;