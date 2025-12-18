import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import DocsListPage from '../features/docs/DocsListPage';
import EditorPage from '../routes/protected/EditorPage';
import LandingPage from '../routes/public/LandingPage';
import AuthPage from '../routes/public/LoginPage';

// import DashboardPage from "../pages/DashboardPage";
// import DocumentsList from "../pages/DocumentsList";
// import EditorPage from "../pages/EditorPage";

export const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingPage />,
	},

	{
		path: '/login',
		element: <AuthPage mode='login' />,
	},
	{
		path: '/register',
		element: <AuthPage mode='register' />,
	},

	{
		path: '/app',
		element: (
			<ProtectedRoute>
				<DashboardLayout />
			</ProtectedRoute>
		),
		children: [
			{ index: true, element: <DashboardPage /> },
			{ path: 'docs', element: <DocsListPage /> },
			{ path: 'docs/:id', element: <EditorPage /> },
		],
	},

	{
		path: '*',
		element: <div>Not Found</div>,
	},
]);
