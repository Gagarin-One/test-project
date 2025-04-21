import { useDraggable } from '@dnd-kit/core';
import styles from './BoardTaskCard.module.scss';
import { Task } from '../../entities/task/types/task.types';

interface Props {
  task: Task;
  onClick?: () => void;
}

export const BoardTaskCard = ({ task, onClick }: Props) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
    data: { status: task.status },
  });

  return (
    <div ref={setNodeRef} className={styles.card} onClick={onClick}>
      {/* Только drag — иконка/зона */}
      <div className={styles.dragHandle} {...listeners} {...attributes}>
        ⠿
      </div>

      {/* Вся остальная область — кликабельна */}
      <div className={styles.content}>
        <div className={styles.title}>{task.title}</div>
        {/* Можно добавить описание, метки и т.д. */}
      </div>
    </div>
  );
};