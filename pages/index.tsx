import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData, PostData } from 'lib/posts';
import Layout, { siteTitle } from 'components/layout';
import Date from 'components/date';
import utilStyles from 'styles/utils.module.css';

const Home: FC<{ allPostsData: PostData[] }> = ({ allPostsData }) => (
  <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyles['heading-md']}>
      <p>Hello, my name is Taylor!</p>
      <p>
        (This is a sample website - you'll be building a site like this on){' '}
        <a href="https://nextjs.org/learn">our Next.js tutorial</a>.
      </p>
    </section>
    <section
      className={`${utilStyles['heading-md']} ${utilStyles['padding-1px']}`}
    >
      <h2 className={utilStyles['heading-lg']}>Blog</h2>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles['list-item']} key={id}>
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles['light-text']}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default Home;
