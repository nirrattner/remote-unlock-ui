import { useState } from 'react';
import { 
  Button,
  Container, 
  Flex,
  Heading,
  Section,
  TextField,
} from '@radix-ui/themes';

import * as remoteUnlockApi from '../api/remoteUnlockApi';

import '../../css/login.css';

export default function LoginPage() {
  const [password, setPassword] = useState('');

  const onLoginClick = async () => {
    try {
      const response = await remoteUnlockApi.login(password);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      // const json = await response.json();
      // console.log(json);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <>
      <Section>
        <Container align="center" size="1">
          <Section>
            <Heading size="8">Remote Unlock</Heading>
          </Section>
          <Flex direction="column" gap="3">
            <TextField.Root 
                placeholder="Password" 
                size="3" 
                type="password"
                value={password}
                onChange={onPasswordChange}
              />
            <Button size="3" onClick={onLoginClick}>Login</Button>
          </Flex>
        </Container>
      </Section>
    </>
  );
}
