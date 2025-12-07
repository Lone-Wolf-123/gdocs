//src/users/user.entity.ts
import { createId } from '@paralleldrive/cuid2';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Document } from '../docs/docs.entity.js';

@Entity()
export class User {
  @PrimaryColumn()
  id: string = createId(); // Prisma cuid() equivalent

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  password?: string; // For email/password login

  @Column({ nullable: true })
  provider?: string; // e.g., "google"

  @Column({ nullable: true })
  providerId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Document, (doc) => doc.author)
  documents: Document[];
}
