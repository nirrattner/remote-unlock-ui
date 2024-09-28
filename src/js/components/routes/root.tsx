import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button,
  Container, 
  Flex,
  Heading,
  Select,
  Spinner,
  Text,
} from '@radix-ui/themes';

import * as auth from '../../lib/auth';
import * as doorModel from '../../lib/model/door';
import * as remoteUnlockApi from '../../lib/api/remoteUnlockApi';

import MessageCallout from '../messageCallout';
import FixedSelect from '../fixedSelect';

const SELECTED_DOOR_ID_KEY = 'selected-door-id-key';

function capitalizeFirstLetter(value: string) : string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export default function RootPage() {
  const navigate = useNavigate();
  const [doors, setDoors] = useState<Array<doorModel.Door>>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedDoorId, setSelectedDoorId] = useState<string>('');

  useEffect(() => {
    remoteUnlockApi.getDoors()
        .then(response => {
          setIsLoading(false);
          if (response.status === 401) {
            auth.deleteKey();
            navigate('/login');
            return;
          }
          if (!response.ok) {
            throw new Error(`Failed response ${response.status}`);
          }
          return response.json();
        })
        .then(responseJson => {
          const doors = responseJson['body']['doors']
          setDoors(doors);

          const defaultDoorId = localStorage.getItem(SELECTED_DOOR_ID_KEY);
          if (defaultDoorId) {
            setSelectedDoorId(defaultDoorId);
            return;
          }
          setSelectedDoorId(doors[0]['id'].toString());
        })
        .catch(error => {
          setIsLoading(false);
          console.error(error);
          setErrorMessage('Failed to fetch door information');
        });
    
    return () => {}
  }, []);


  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setResultMessage('');
    
    try {
      const response = await remoteUnlockApi.unlockDoor(selectedDoorId);
      const responseJson = await response.json();
      setIsSubmitting(false);
      if (response.status === 401) {
        auth.deleteKey();
        navigate('/login');
        return;
      }
      if (!response.ok) {
        setErrorMessage(responseJson['error']);
        return;
      }
      if (responseJson['body']['result_type'] !== 'OK') {
        setErrorMessage('Failed to unlock door');
        console.error(responseJson['body']['result_type']);
        return;
      }
      setResultMessage('Unlocked!');
    } catch (error: any) {
      setIsSubmitting(false);
      console.error(error);
      setErrorMessage('Unknown error');
    }
  }

  function onSelectDoorId(value: string) {
    setErrorMessage('');
    setResultMessage('');

    localStorage.setItem(SELECTED_DOOR_ID_KEY, value);
    setSelectedDoorId(value);
  }

  function getDoorUnlockForm() {
    if (doors.length === 0) {
      return null;
    }
  
    const doorSelectItems = doors
        .sort((door1, door2) => {
          if (door1['name'] > door2['name']) {
            return 1;
          }
          if (door1['name'] < door2['name']) {
            return -1;
          }
          return 0;
        })
        .map(door => {
          const doorName = door['name']
              .split('_')
              .map(doorSplit => capitalizeFirstLetter(doorSplit))
              .join(' ');
          return (
            <Select.Item 
                key={door['id']} 
                value={door['id'].toString()}
            >
                {doorName}
            </Select.Item>
          );
        });
  
    return (
      <>
        <Heading>Choose Door</Heading>
        <FixedSelect
            value={selectedDoorId} 
            onValueChange={onSelectDoorId}
            size="3"
            disabled={isSubmitting}
          >
          <Select.Trigger />
          <Select.Content>
            {doorSelectItems}
          </Select.Content>
        </FixedSelect>
        <Button size="3" disabled={isSubmitting}>Unlock</Button>
      </>
    );
  }

  return (
    <>
      <Container align="center" size="1" px="3">
          <Flex justify="center">
            <Spinner size="3" loading={isLoading} />
          </Flex>
        <form onSubmit={onSubmit}>
          <Flex 
              direction="column" 
              gap="5"
          >
            {getDoorUnlockForm()}
          <MessageCallout message={errorMessage} color="red" />
          <MessageCallout message={resultMessage} color="green" />
          </Flex>
        </form>
      </Container>
    </>
  );
}

