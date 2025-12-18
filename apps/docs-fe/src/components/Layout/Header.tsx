//apps\docs-fe\src\components\layout\Header.tsx
import {
	ThemeOptions,
	useAppDataStore,
	type Theme,
} from '../../store/useAppData';
import { useEditorStore } from '../../store/useEditorStore';

export default function Header() {
	const { docId, title, permission, loading } = useEditorStore();
	const theme = useAppDataStore((s) => s.theme);
	const setTheme = useAppDataStore((s) => s.setTheme);

	return (
		<header className='p-3 border-b flex items-center justify-between'>
			<div>
				{docId ? (
					<div className='flex items-center gap-2'>
						<span className='font-semibold'>{title}</span>
						{permission === 'read' && (
							<span className='text-xs border px-2 py-1 rounded'>
								Read only
							</span>
						)}
					</div>
				) : (
					<span className='font-semibold'>Gdocs Lite</span>
				)}
			</div>

			<select
				className='border p-2 rounded'
				value={theme}
				onChange={(e) => setTheme(e.target.value as Theme)}>
				<option value={ThemeOptions.Light}>Light</option>
				<option value={ThemeOptions.Dark}>Dark</option>
				<option value={ThemeOptions.System}>System</option>
			</select>
		</header>
	);
}
