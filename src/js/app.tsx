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

import LoginPage from './routes/login';
import Menu from './components/menu';
import RootPage from './routes/root';

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Section size="1" pb="80px">
        <Heading size="8">Remote Unlock</Heading>
      </Section>
      <Routes>
        <Route path="/" element={<RootPage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

