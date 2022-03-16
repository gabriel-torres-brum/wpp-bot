import { EntityRepository, Repository } from "typeorm";
import { Chat } from "../entities/Chat";

@EntityRepository(Chat)
class ChatsRepositories extends Repository<Chat> {}

export { ChatsRepositories };
