import clsx from 'clsx';
import styles from './Button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'accent';
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', children, className, ...rest }: Props) => {
  return (
    <button className={clsx(styles.button, styles[variant], className)} {...rest}>
      {children}
    </button>
  );
};
