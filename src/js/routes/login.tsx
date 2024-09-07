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

import * as auth from '../lib/auth';
import * as remoteUnlockApi from '../api/remoteUnlockApi';

import '../../css/login.css';

function getErrorCallout(errorMessage: string) {
  if (errorMessage === '') {
    return null;
  }

  return (
    <>
      <Callout.Root color="red">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          {errorMessage}
        </Callout.Text>
      </Callout.Root>
    </>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onLoginClick = async () => {
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
      <Container align="center" size="1">
        <Flex direction="column" gap="3">
          <TextField.Root 
              placeholder="Password" 
              size="3" 
              type="password"
              value={password}
              onChange={onPasswordChange}
            />
          <Button size="3" onClick={onLoginClick}>Login</Button>
          {getErrorCallout(errorMessage)}
        </Flex>
      </Container>
    </>
  );
}
