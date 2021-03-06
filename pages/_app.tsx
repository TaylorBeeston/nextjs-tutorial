import React, { FC } from 'react';
import { AppProps } from 'next/app';
import 'styles/global.css';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Component {...pageProps} />
);

export default App;
