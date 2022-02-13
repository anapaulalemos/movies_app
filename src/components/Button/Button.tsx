import styles from './Button.module.scss';

interface ButtonProps {
    type: 'submit' | 'reset' | 'button' | undefined;
    title: string;
    icon: React.ReactNode;
    disabled?: boolean;
    name?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
    icon,
    title,
    type,
    ...props
}: ButtonProps) => (
    <button
        className={styles.button}
        type={type}
        title={title}
        {...props}
    >
        {icon}
    </button>
);

export default Button;