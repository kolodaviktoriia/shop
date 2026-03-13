import React from 'react';
import { useSelector } from 'react-redux';
import WidthWrapper from '../WidthWrapper/WidthWrapper.js';
import LinkSecondary from '../LinkSecondary/LinkSecondary.js';
import Logo from '../Logo/Logo.js';

import * as styles from './Footer.module.scss';

const capitalize = (word) => word.substring(0, 1).toUpperCase() + word.substring(1);

const Footer = () => {
    const navigation = {
        shop: [
        ],
        collections: [],
        // help: [
        //     { label: "Contact Us", link: "/contact" },
        //     { label: "Shipping & Delivery", link: "/shipping" },
        //     { label: "Returns", link: "/returns" },
        //     { label: "FAQ", link: "/faq" },
        // ],

        // company: [
        //     { label: "About Us", link: "/about" },
        //     { label: "Our Ingredients", link: "/ingredients" },
        //     { label: "Sustainability", link: "/sustainability" },
        //     { label: "Privacy Policy", link: "/privacy" },
        //     { label: "Terms of Service", link: "/terms" },
        // ],
    }
    const { categories, collections } = useSelector(store => store.products);
    navigation.shop = categories.map(category => ({
        label: capitalize(category.name), link: `/products/${category.name}`
    }))
    navigation.collections = collections.map(collection => ({
        label: capitalize(collection.name), link: `/collection/${collection.name}`
    }))
    return (
        <footer className={styles.footer}>
            <WidthWrapper className={styles.navGrid}>
                {Object.entries(navigation).map(([key, nav]) =>
                    <div key={key} className={styles.nav}>
                        <h3 className={styles.title}>
                            {key}
                        </h3>
                        {nav.map(({ label, link }) => <LinkSecondary to={link} key={link} >{label}</LinkSecondary>)}
                    </div>
                )}
                <div className={styles.socialsWrapper}>
                    <Logo />
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
                        <LinkSecondary to='https://linkedin.com' isIcon>
                            <ion-icon name="logo-linkedin"></ion-icon>
                        </LinkSecondary>

                    </div>
                </div>
            </WidthWrapper>
            <div className={styles.copyrightWrapper}>
                <WidthWrapper>
                    <p className={styles.copyright}>
                        © 2026 Blush & Blossom. All rights reserved. Designed and developed by <a
                            href="https://www.viktoriia-koloda.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.authorLink}
                        >
                            Viktoriia Koloda
                        </a> as a portfolio project for demonstration purposes only. The shop and products are fictional. All code and content may not be copied, reproduced, or used without permission.
                    </p>
                </WidthWrapper>
            </div>
        </footer >
    )
}

export default Footer;