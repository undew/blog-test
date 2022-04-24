import * as React from 'react';
import Link from "next/link";
import { client } from '../libs/client';
import Layout, { siteTitle } from '../components/layout';
import Head from 'next/head';
import styles from '../styles/top.module.scss'
import Date from '../components/date';
import type {blog} from '../types/blog';
import {GetStaticProps} from 'next';
import Menu from '../components/menu';
// type Props = {
//   blog:Array<blog>;
// }

export default function Home({ blog,category }) {
  const [array,setArray] = React.useState(blog);
  const handleClick = (list) =>{
    if(list !== 'すべて'){
    const result = blog.filter((item)=>{
      return item.category.name.toLowerCase().match(list.toLowerCase());
    })
    setArray(result);
    }else{
      setArray(blog);
    }
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={styles.main}>
        <div className={styles.blogHeader}>
        <h2>記事一覧</h2>
        <Menu onClick={(list:string)=>handleClick(list)} category={category}/>
        </div>
        <ul>
          {array.map((blog) => (
            <React.Fragment key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                <li className={styles.list}>
                  <span className={styles.date}>
                    <Date dateString={blog.publishedAt} />
                  </span>
                  <span className={styles.title}>{blog.title}</span>
                </li>
              </Link>
            </React.Fragment>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps:GetStaticProps = async () => {
  const data = await client.get({ endpoint: 'blog' });
  const categoryData = await client.get({endpoint:'categories'})
  // オブジェクトを返すため、囲いは{}
  return {
    props: {
      blog: data.contents,
      category:categoryData.contents,
    }
  }

}