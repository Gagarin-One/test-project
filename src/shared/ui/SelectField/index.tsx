import styles from './SelectField.module.scss'

interface Option {
  label: string
  value: string
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
}

export const SelectField = ({ label, options, ...rest }: Props) => (
  <label className={styles.wrapper}>
    {label && <span className={styles.label}>{label}</span>}
    <select className={styles.select} {...rest}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </label>
)
