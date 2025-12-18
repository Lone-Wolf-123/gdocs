//apps/docs-fe/src/routes/protected/EditorPage.tsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/api';
import { useEditorStore } from '../../store/useEditorStore';

export default function EditorPage() {
	const { id } = useParams<{ id: string }>();
	const setDocMeta = useEditorStore((s) => s.setDocMeta);
	const clear = useEditorStore((s) => s.clear);

	useEffect(() => {
		if (!id) return;

		api.get(`/docs/${id}`).then((res) => {
			const doc = res.data;

			setDocMeta({
				docId: doc.id,
				title: doc.title || 'Give me name :)',
				permission: doc.permission, // 'read' | 'write'
			});
		});

		return () => clear();
	}, [id, setDocMeta, clear]);

	return <div className='p-4'>Editor content here</div>;
}
