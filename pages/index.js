import Head from 'next/head'
import styles from '../styles/Home.module.css'
import products from '../products.json'
import { initiateCheckout } from '../lib/payments' 

export default function Home() {
  console.log('products', products);
  console.log('NEXT_PUBLIC_STRIPE_API_KEY=', process.env.NEXT_PUBLIC_STRIPE_API_KEY);
  return (
    <div className={styles.container}>
      <Head>
        <title>Gemma Rutter Masks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Gemma Rutter Masks
        </h1>

        <p className={styles.description}>
          Home-made masks and scrunchies!
        </p>

        <ul className={styles.grid}>
          {products.map(product => {
            const {id, title, price, description, image } = product;
            return (
              <li key={id} className={styles.card}>
                <a>
                  <img src={ image } alt={ title }/>
                  <h3>{ title }</h3>
                  <p>£{ price }</p>
                  <p>{ description }</p>
                </a>
                <p>
                  <button className={styles.button} onClick={() => {
                    initiateCheckout({
                      lineItems: [
                        {
                          price: id,
                          quantity: 1
                        }
                      ]
                    });
                  }}>Buy Now!</button>
                </p>
              </li>
            )
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
