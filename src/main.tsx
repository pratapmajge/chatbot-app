import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NhostProvider } from '@nhost/react'
import { nhost } from './lib/nhost'
import { ApolloProvider } from '@apollo/client'
import { apollo } from './lib/apollo'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={apollo}>
        <App />
      </ApolloProvider>
    </NhostProvider>
  </React.StrictMode>,
)
