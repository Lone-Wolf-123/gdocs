import {
  CreateDocumentDTO,
  DocumentDTO,
  UpdateDocumentDTO,
} from '@gdocs/shared/document.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { Document } from './docs.entity';

@Injectable()
export class DocsService {
  constructor(
    @InjectRepository(Document)
    private repo: Repository<Document>,
  ) {}

  async findAll(userId: string): Promise<DocumentDTO[]> {
    const docs = await this.repo.find({
      where: { authorId: userId },
    });

    if (!docs || docs.length === 0) return [];

    return docs.map((d) =>
      plainToInstance(DocumentDTO, d, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findByIdForUser(
    docId: string,
    userId: string,
  ): Promise<DocumentDTO | null> {
    const user = await this.repo.findOne({
      where: {
        id: docId,
        authorId: userId,
      },
      relations: { author: true },
    });
    return plainToInstance(DocumentDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  async getOne(id: string, userId: string): Promise<DocumentDTO | null> {
    const doc = await this.repo.findOne({
      where: { id, authorId: userId },
      relations: { author: true },
    });

    if (!doc) return null; // controller will handle 404

    return plainToInstance(DocumentDTO, doc, {
      excludeExtraneousValues: true,
    });
  }

  async create(data: CreateDocumentDTO, userId: string): Promise<DocumentDTO> {
    const doc = this.repo.create({
      ...data,
      authorId: userId,
    });

    const saved = await this.repo.save(doc);

    const dto = await this.getOne(saved.id, userId);

    if (!dto) throw new NotFoundException(`Document creation failed`);

    return dto;
  }

  async update(
    id: string,
    data: UpdateDocumentDTO,
    userId: string,
  ): Promise<DocumentDTO | null> {
    const existing = await this.repo.findOne({
      where: { id, authorId: userId },
      relations: { author: true },
    });

    if (!existing) return null; // unauthorized or not found

    const doc = await this.repo.update(id, data).catch(() => null);

    if (!doc) return null;

    return this.getOne(id, userId);
  }
}
