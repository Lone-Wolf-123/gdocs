//apps\docs-fe\src\features\dashboard\Sidebar.tsx
import { Link } from 'react-router-dom';
import { useEditorStore } from '../../store/useEditorStore';

export default function Sidebar() {
	const { docId, permission } = useEditorStore();

	return (
		<aside className='w-64 border-r p-4 flex flex-col gap-2'>
			<Link to='/app'>Home</Link>
			<Link to='/app/docs'>Documents</Link>

			{docId && (
				<div className='mt-4 border-t pt-4'>
					<div className='text-xs text-gray-500 mb-2'>Current document</div>
					<div className='text-sm'>{docId}</div>

					{permission === 'write' && (
						<button className='mt-2 text-sm'>Share</button>
					)}
				</div>
			)}
		</aside>
	);
}
