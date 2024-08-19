import React from 'react';
import styles from './IntroComponent.module.css';

const IntroductionComponent = () => {
    return (
        <div className={styles.introduction}>
            <p>Welcome to my movie diary, where I share my thoughts on the movies I've watched recently. You'll find my honest reviews and ratings right here but please don't hate me if I am too honest 😁 Feel free to browse through my collection!</p>
        </div>
    );
};

export default IntroductionComponent;
