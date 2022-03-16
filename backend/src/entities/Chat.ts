import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v1 as uuid } from "uuid";

@Entity("chats")
export class Chat {
  
  @PrimaryColumn()
  readonly id: string;

  @Column({unique: true})
  chatId: string;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @Column({nullable: true})
  cpf: string;

  @Column({nullable: true})
  step: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
  
}
