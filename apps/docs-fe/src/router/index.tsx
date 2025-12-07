import {createBrowserRouter} from "react-router-dom";
import DashboardLayout from "../components/Layout/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthPage from "../pages/AuthPage";
// import DashboardPage from "../pages/DashboardPage";
// import DocumentsList from "../pages/DocumentsList";
// import EditorPage from "../pages/EditorPage";
import LandingPage from "../pages/LandingPage";

export const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingPage />,
	},

  {
    path: "/login",
    element: <AuthPage mode="login" />,
  },
  {
    path: "/register",
    element: <AuthPage mode="register" />,
	},

  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    // children: [
    //   { index: true, element: <DashboardPage /> },
    //   { path: "documents", element: <DocumentsList /> },
    //   { path: "documents/:id", element: <EditorPage /> },
    // ],
  },
]);