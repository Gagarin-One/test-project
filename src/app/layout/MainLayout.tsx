import { Outlet, useMatch, useParams } from 'react-router-dom';

import { useState } from 'react';
import { Header } from '../../widgets/Header';
import { TaskFormModal } from '../../features/TaskForm/TaskFormModal';

export const MainLayout = () => {
  const [formOpen, setFormOpen] = useState(false);
  const match = useMatch('/board/:id');
  const params = useParams();

  const boardId = match && params.id ? Number(params.id) : undefined;
  const isBoardPage = Boolean(boardId);

  return (
    <>
      <Header onCreateTask={() => setFormOpen(true)} />
      <main style={{ padding: '2rem' }}>
        <Outlet context={{ onCreateTask: () => setFormOpen(true) }} />
      </main>

      <TaskFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        initialValues={boardId ? { boardId } : undefined}
        isBoardPage={isBoardPage}
      />
    </>
  );
};
