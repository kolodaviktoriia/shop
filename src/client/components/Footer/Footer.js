import React, { useState } from 'react';
import WidthWrapper from '../WidthWrapper/WidthWrapper.js';
import { useSelector } from 'react-redux';

import * as styles from './Footer.module.scss';
import LinkSecondary from '../LinkSecondary/LinkSecondary.js';
import Logo from '../Logo/Logo.js';

const footerData = {
    brand: {
        name: "Blush & Bloom",
        description:
            "Cute cosmetics inspired by nature. Discover skincare, makeup, and beauty treats made to help your natural glow shine.",
    },

    navigation: {
        shop: [
        ],
        collections: [],
        help: [
            { label: "Contact Us", link: "/contact" },
            { label: "Shipping & Delivery", link: "/shipping" },
            { label: "Returns", link: "/returns" },
            { label: "FAQ", link: "/faq" },
        ],

        company: [
            { label: "About Us", link: "/about" },
            { label: "Our Ingredients", link: "/ingredients" },
            { label: "Sustainability", link: "/sustainability" },
            { label: "Privacy Policy", link: "/privacy" },
            { label: "Terms of Service", link: "/terms" },
        ],
    }
    ,
    copyright: "© 2026 Blush & Bloom. All rights reserved.",
};
const capitalize = (word) => word.substring(0, 1).toUpperCase() + word.substring(1)
const Footer = () => {
    const { categories, collections } = useSelector(store => store.products);
    footerData.navigation.shop = categories.map(category => ({
        label: capitalize(category.name), link: `/${category.name}`
    }))
    footerData.navigation.collections = collections.map(collection => ({
        label: capitalize(collection.name), link: `/ ${collection.name}`
    }))
    return (
        <footer className={styles.footer}>
            <WidthWrapper>
                <div className={styles.infoBar}></div>
                <div className={styles.navGrid}>
                    {Object.entries(footerData.navigation).map(([key, nav]) =>
                        <div key={key} className={styles.nav}>
                            <h3 className={styles.title}>
                                {key}
                            </h3>
                            {nav.map(({ label, link }) => <LinkSecondary to={link} key={link} >{label}</LinkSecondary>)}
                        </div>
                    )}
                    <div className={styles.socialsWrapper}>
                        <Logo className={styles.logo} />
                        <div className={styles.socials}>
                            <LinkSecondary to='https://tiktok.com' isIcon>
                                <ion-icon name="logo-tiktok"></ion-icon>
                            </LinkSecondary>
                            <LinkSecondary to='https://instagram.com' isIcon>
                                <ion-icon name="logo-instagram"></ion-icon>
                            </LinkSecondary>
                            <LinkSecondary to='https://pinterest.com' isIcon>
                                <ion-icon name="logo-pinterest"></ion-icon>
                            </LinkSecondary>
                            <LinkSecondary to='https://facebook.com' isIcon>
                                <ion-icon name="logo-facebook"></ion-icon>
                            </LinkSecondary>
                            <LinkSecondary to='https://linkedin.com' isIcon>     <ion-icon name="logo-linkedin"></ion-icon>
                            </LinkSecondary>

                        </div>
                    </div>
                </div>
            </WidthWrapper>
            <div className={styles.copyrightWrapper}>
                <WidthWrapper>
                    <p className={styles.copyright}>
                        {footerData.copyright}
                    </p></WidthWrapper>
            </div>
        </footer >
    )
}

export default Footer;