import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'
import styles from './layout.module.scss';

const name = "undew"
export const siteTitle = "JAMstack Undew"

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode,
  home?: boolean
}) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="undewのブログです。"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/profile.jpg"
                height={144}
                width={144}
                alt={name}
              />
              <h1>{name}</h1>
              <p>フロントエンジニアのUndewです。</p>
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  height={144}
                  width={144}
                  alt={name}
                />
                </a>
              </Link>
              <h2>
                <Link href="/">
                  {name}
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.footer}>
            <Link href="/">
              <a>← TOPに戻る</a>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}