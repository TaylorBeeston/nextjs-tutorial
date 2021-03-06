import React, { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import utilStyles from 'styles/utils.module.css';
import styles from './layout.module.css';

const name = 'Taylor Beeston';
export const siteTitle = 'Next.js Sample Website';

type LayoutProps = {
  home?: boolean;
};

const Layout: FC<LayoutProps> = ({ children, home = false }) => (
  <div className={styles.container}>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Learn how to build a personal website using Next.js"
      />
      <meta
        property="og:image"
        content={`https://og-image.now.sh/${encodeURI(
          siteTitle,
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <header className={styles.header}>
      {home ? (
        <>
          <img
            src="/images/picture.jpg"
            className={`${styles['header-home-image']} ${utilStyles['border-circle']}`}
            alt={name}
          />
          <h1 className={utilStyles['heading-2xl']}>{name}</h1>
        </>
      ) : (
        <>
          <Link href="/">
            <a>
              <img
                src="/images/picture.jpg"
                className={`${styles['header-image']} ${utilStyles['border-circle']}`}
                alt={name}
              />
            </a>
          </Link>
          <h2>
            <Link href="/">
              <a className={utilStyles['color-inherit']}>{name}</a>
            </Link>
          </h2>
        </>
      )}
      <main>{children}</main>
      {!home && (
        <div className={styles['back-to-home']}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </header>
  </div>
);

export default Layout;
