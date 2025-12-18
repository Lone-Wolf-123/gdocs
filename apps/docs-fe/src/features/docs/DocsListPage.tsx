//apps\docs-fe\src\features\docs\DocsListPage.tsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';

export default function DocsListPage() {
	const [docs, setDocs] = useState<any[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		api.get('/docs').then((res) => setDocs(res.data));
	}, []);

	async function createDoc() {
		const res = await api.post('/docs');
		navigate(`/app/docs/${res.data.id}`);
	}

	return (
		<div className='p-4'>
			<button onClick={createDoc}>New Document</button>

			<ul>
				{docs.map((d) => (
					<li key={d.id}>
						<Link to={`/app/docs/${d.id}`}>{d.title || 'Untitled'}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
