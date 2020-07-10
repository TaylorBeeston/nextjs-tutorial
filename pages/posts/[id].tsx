import React, { FC } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPostIds, getPostData, PostData } from 'lib/posts';
import Layout from 'components/layout';
import Date from 'components/date';
import utilStyles from 'styles/utils.module.css';

const Post: FC<{ postData: PostData }> = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles['heading-xl']}>{postData.title}</h1>
        <div className="utilStyles['light-text']">
          <Date dateString={postData.date} />
        </div>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml! }} />
      </article>
    </Layout>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  { postData: PostData },
  {
    id: string;
  }
> = async ({ params }) => {
  const postData = await getPostData(params!.id);

  return {
    props: {
      postData,
    },
  };
};
