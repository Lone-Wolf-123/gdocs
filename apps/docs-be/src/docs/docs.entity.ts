//src/documents/document.entity.ts
import { createId } from '@paralleldrive/cuid2';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity.js';

@Entity()
export class Document {
  @PrimaryColumn()
  id: string = createId(); // Prisma cuid()

  @Column()
  title: string;

  @Column({ type: 'text', default: '' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  authorId: string;

  @ManyToOne(() => User, (user) => user.documents, { onDelete: 'CASCADE' })
  author: User;
}
