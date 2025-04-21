import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../../app/layout/MainLayout';
import { BoardsPage } from '../../pages/BoardsPage';
import { BoardPage } from '../../pages/BoardPage';
import { TasksPage } from '../../pages/TasksPage';
import { NotFound } from '../../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Navigate to="/boards" replace />  },
      { path: 'boards', element: <BoardsPage /> },
      { path: 'board/:id', element: <BoardPage /> },
      { path: 'issues', element: <TasksPage /> },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
