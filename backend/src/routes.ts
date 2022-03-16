import { Router } from 'express';
import { CreateChatController } from './controllers/CreateChatController';
import { FindChatController } from './controllers/FindChatController';
import { UpdateChatController } from './controllers/UpdateChatController';

const router = Router();

const createChatController = new CreateChatController();
const findChatController = new FindChatController();
const updateChatController = new UpdateChatController();

router.post('/chat/create', createChatController.handle);
router.post('/chat/find', findChatController.handle);
router.post('/chat/update', updateChatController.handle);

export { router };
