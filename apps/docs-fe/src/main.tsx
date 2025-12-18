import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'reflect-metadata';
import '../src/lib/api.ts';
import ThemeManager from './app/providers/ThemeManager.tsx';
import { router } from './app/router.tsx';
import './index.css';
import { useAppDataStore } from './store/useAppData.ts';

useAppDataStore.getState().setTheme(useAppDataStore.getState().theme);
createRoot(document.getElementById('root')!).render(
	<>
		<ThemeManager />
		<RouterProvider router={router} />
	</>,
);
