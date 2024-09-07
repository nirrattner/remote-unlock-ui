import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

import App from './js/app';

import '@radix-ui/themes/styles.css';

import './css/index.css';

export const ThemeProviderWrapper = (props: ThemeProviderProps): React.JSX.Element => {
    return ThemeProvider(props) as React.JSX.Element;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProviderWrapper attribute="class">
      <Theme>
        <App />
      </Theme>
    </ThemeProviderWrapper>
  </React.StrictMode>
);

