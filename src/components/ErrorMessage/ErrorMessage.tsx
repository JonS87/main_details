import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
    onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ onRetry }) => {
    return (
        <div className={styles['error-block']}>
            <span>Произошла ошибка!</span>
            <button onClick={onRetry} className={styles['error-buttin']}>
                Повторить запрос
            </button>
        </div>
    );
};

export default ErrorMessage;
