import {FC, Fragment} from 'react'
import {AppProps} from 'next/app'
import Layout from '@components/app/layout'
const App: FC<AppProps> = ({Component, pageProps}) => (
  <Fragment>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Fragment>
)

export default App
