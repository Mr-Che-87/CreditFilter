import styles from './CreditItem.module.scss';

interface CreditItemProps {
    amount: number;
    name: string;
    logo: string;
  }


export default function CreditItem({ name, amount, logo }: CreditItemProps) {
  const formattedAmount = new Intl.NumberFormat('ru-RU').format(amount); //визуальные пробелы-разделители 

  return (
    <div className={styles.itemContainer}>
        <div className={styles.bankContainer}>
            <img className={styles.bankLogo} src={logo} alt={`${name} logo`} />
            <h2 className={styles.bankName}>{name}</h2>
        </div>
        <div className={styles.creditContainer}>
            <p className={styles.creditTitle}>Максимальная сумма</p>
            <h2 className={styles.creditAmount}>
                {formattedAmount}
                <span>&nbsp;₽</span>
            </h2>
        </div>
    </div>
);
}