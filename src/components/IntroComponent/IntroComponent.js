import React from 'react';
import styles from './IntroComponent.module.css';

const IntroductionComponent = () => {
    return (
        <div className={styles.introduction}>
            <p>
                Hello! Welcome to my movie diary.
                You'll find my honest reviews and ratings right here but please don't hate me if I am too honest 😁
            </p>
        </div>
    );
};

export default IntroductionComponent;
