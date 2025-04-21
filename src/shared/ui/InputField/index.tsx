import styles from './InputField.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const InputField = ({ label, ...rest }: Props) => (
  <label className={styles.wrapper}>
    {label && <span className={styles.label}>{label}</span>}
    <input className={styles.input} {...rest} />
  </label>
)