import React  from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { 
  Heading,
  Section,
} from '@radix-ui/themes';

import LoginPage from './components/routes/login';
import Menu from './components/menu';
import RootPage from './components/routes/root';

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Menu />
      <Section size="1" pb="80px">
        <Heading align="center" size="8">Remote Unlock</Heading>
      </Section>
      <Routes>
        <Route path="/" element={<RootPage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

