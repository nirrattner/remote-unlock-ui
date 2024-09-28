import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button,
  Callout,
  Container, 
  Flex,
  Heading,
  Section,
  TextField,
} from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons'

import * as auth from '../../lib/auth';
import * as remoteUnlockApi from '../../lib/api/remoteUnlockApi';

import MessageCallout from '../messageCallout';

export default function LoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage('');
    try {
      const response = await remoteUnlockApi.login(password);
      const responseJson = await response.json();

      if (response.ok) {
        auth.setKey(password);
        navigate('/');
        return;
      }
      setErrorMessage(responseJson['error']);
    } catch (error: any) {
      console.error(error);
      setErrorMessage('Unknown error');
    }
  };

  const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <>
      <Container align="center" size="1" px="3">
        <form onSubmit={onSubmit}>
          <Flex direction="column" gap="5">
              <TextField.Root 
                  placeholder="Password" 
                  size="3" 
                  type="password"
                  value={password}
                  onChange={onPasswordChange}
                />
              <Button size="3" type="submit">Login</Button>
          <MessageCallout message={errorMessage} color="red" />
          </Flex>
        </form>
      </Container>
    </>
  );
}
