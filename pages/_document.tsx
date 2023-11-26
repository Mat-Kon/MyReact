import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </Head>
      <title>SwapNext</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
