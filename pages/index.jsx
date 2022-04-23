import React from 'react';
import Link from "next/link";
import { client } from '../libs/client';
import Layout, { siteTitle } from '../components/layout';
import Head from 'next/head';
import styles from '../styles/top.module.scss'
import Date from '../components/date';

export default function Home({ blog }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={styles.main}>
        <h2>記事一覧</h2>
        <ul>
          {blog.map((blog) => (
            <React.Fragment key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                <li className={styles.list}>
                  <span className={styles.date}>
                    <Date dateString={blog.publishedAt} />
                  </span>
                  <span className={styles.title}>{blog.title}</span>
                </li>
              </Link>
              {/* <li>{blog.eyecatch}</li> */}
            </React.Fragment>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'blog' });

  // オブジェクトを返すため、囲いは{}
  return {
    props: {
      blog: data.contents,
    }
  }

}