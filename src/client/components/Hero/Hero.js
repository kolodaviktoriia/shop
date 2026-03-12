import React from 'react';
import WidthWrapper from '../WidthWrapper/WidthWrapper.js';

import * as styles from './Hero.module.scss';
import ButtonLink from '../ButtonLink/ButtonLink.js';

const Hero = () => {

    return (
        <section id='hero' className={styles.heroSection}>
            <WidthWrapper className={styles.heroWrapper}>
                <div className={styles.textWrapper}>
                    <h1>Glow Naturally, Shine Fantastically</h1>
                    <h2>Potions, scrubs, and serums that make your skin giggle with joy</h2>
                    <ButtonLink to='/products/all'>Sprinkle Some Magic</ButtonLink>
                </div>
                <img
                    src="https://ikaoenxuuphxuvaiwzex.supabase.co/storage/v1/object/public/images/heroMobile.png"
                    className={styles.mobileImg} />
                <img
                    className={styles.heroImg}
                    src="https://ikaoenxuuphxuvaiwzex.supabase.co/storage/v1/object/public/images/hero.png"
                    alt="Hero"
                />
            </WidthWrapper>
        </section >
    )
}

export default Hero;