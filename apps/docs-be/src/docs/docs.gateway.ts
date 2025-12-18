// src/docs/docs.gateway.ts

import { DocumentDTO, UpdateDocumentDTO } from '@gdocs/shared/document.js';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';
import { DocsService } from './docs.service.js';

@WebSocketGateway({
	cors: { origin: '*' }, // change during deployment
})
export class DocsGateway implements OnGatewayConnection {
	@WebSocketServer()
	server: Server;

	constructor(private readonly docsService: DocsService) {}

	private verifyToken(token: string) {
		return jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
	}

	handleConnection(client: Socket) {
		const token = client.handshake.query.token as string;

		try {
			const payload: any = this.verifyToken(token);
			client.data.userId = payload.sub; // attach user ID
		} catch {
			client.disconnect();
		}
	}

	@SubscribeMessage('joinDoc')
	async handleJoin(
		@MessageBody() data: { docId: string },
		@ConnectedSocket() client: Socket,
	) {
		const userId = client.data.userId;

		const doc = await this.docsService.findByIdForUser(data.docId, userId);
		if (!doc) return { error: 'Forbidden' };

		client.join(data.docId);

		return { success: true };
	}

	@SubscribeMessage('updateDoc')
	async handleUpdateDoc(
		@MessageBody() data: { docId: string; content: UpdateDocumentDTO },
		@ConnectedSocket() client: Socket,
	) {
		const userId = client.data.userId;

		const updated = await this.docsService.update(
			data.docId,
			data.content,
			userId,
		);

		// Broadcast to all other users in this document room
		this.server.to(data.docId).emit('docUpdated', updated);

		return updated;
	}

	@SubscribeMessage('getDoc')
	async getFullDoc(
		@MessageBody() docId: string,
		@ConnectedSocket() client: Socket,
	): Promise<DocumentDTO | null> {
		const userId = client.data.userId;
		return await this.docsService.getOne(docId, userId);
	}
}
