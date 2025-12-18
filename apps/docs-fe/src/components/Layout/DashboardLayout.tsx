//apps\docs-fe\src\components\layout\DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../../features/dashboard/Sidebar';
import Header from './Header';

export default function DashboardLayout() {
	return (
		<div className='flex flex-col h-screen'>
			<Header />
			<div className='flex flex-1'>
				<Sidebar />
				<main className='flex-1 overflow-auto'>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
