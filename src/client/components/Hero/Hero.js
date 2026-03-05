import React, { useState } from 'react';
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
                    <ButtonLink to='/all'>Sprinkle Some Magic</ButtonLink>
                </div>
                <div className={styles.imgWrapper}>
                    <img src='https://ikaoenxuuphxuvaiwzex.supabase.co/storage/v1/object/public/images/heroImg.png' />
                </div>
            </WidthWrapper>
        </section>
    )
}

export default Hero;