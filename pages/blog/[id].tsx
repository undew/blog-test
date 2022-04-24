// pages/blog/[id].js
import { client } from "../../libs/client";
import styles from '../../styles/Home.module.scss';
import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date'
import type {blog} from '../../types/blog';
import { GetStaticPaths, GetStaticProps } from "next";

type Props = {
  blog: blog;
}
export default function BlogId({ blog }: Props) {
  const siteUrl = `https://undew.microcms.io/api/v1/blog/${blog.id}`;
  return (
    <Layout>
      <Head>
        <meta property="twitter:card" content="summary"/>
        <meta property="twitter:title" content={blog.title}/>
        <meta property="twitter:url" content={siteUrl}/>
        <meta property="twitter:description" content={blog.content}/>
        <meta property="twitter:image" content={blog.eyecatch.url}/>
        <meta property="og:image" content={blog.eyecatch.url} />
        <meta property="og:title" content={blog.title} key="title"/>
        <title>{blog.title} | Next.js Undew</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{blog.title}</h1>
        <Date dateString={blog.publishedAt} />
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.content}`,
          }}
          className={styles.post}
        />
      </main>
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths:GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id as string}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps:GetStaticProps = async (context) => {
  const id = context.params.id as string;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};