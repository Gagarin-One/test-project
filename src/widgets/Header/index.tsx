import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { Button } from '../../shared/ui/Button';

interface Props {
  onCreateTask?: () => void;
}

export const Header = ({ onCreateTask }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/issues" className={styles.navItem}>
            Все задачи
          </Link>
          <Link to="/boards" className={styles.navItem}>
            Проекты
          </Link>
        </nav>

        <div className={styles.profile}>
          {onCreateTask && <Button onClick={onCreateTask}>Создать задачу</Button>}
        </div>
      </div>
    </header>
  );
};
