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

import * as auth from '../lib/auth';
import * as doorModel from '../model/door';
import * as remoteUnlockApi from '../api/remoteUnlockApi';

import ErrorCallout from '../components/errorCallout';

const SELECTED_DOOR_ID_KEY = 'selected-door-id-key';

function capitalizeFirstLetter(value: string) : string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function getDoorUnlockForm(
    doors: Array<doorModel.Door>,
    selectedDoorId: string,
    setSelectedDoorId: (value: string) => void,
    isSubmitting: boolean,
) {
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
      <Select.Root
          value={selectedDoorId} 
          onValueChange={setSelectedDoorId}
          size="3"
          disabled={isSubmitting}
        >
        <Select.Trigger />
        <Select.Content>
          {doorSelectItems}
        </Select.Content>
      </Select.Root>
      <Button size="3" disabled={isSubmitting}>Unlock</Button>
    </>
  );
}

export default function RootPage() {
  const navigate = useNavigate();
  const [doors, setDoors] = useState<Array<doorModel.Door>>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
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
  }

  function onSelectDoorId(value: string) {
    localStorage.setItem(SELECTED_DOOR_ID_KEY, value);
    setSelectedDoorId(value);
  }

  return (
    <>
      <Container align="center" size="1">
          <Flex justify="center">
            <Spinner size="3" loading={isLoading} />
          </Flex>
        <form onSubmit={onSubmit}>
          <Flex 
              direction="column" 
              gap="5"
          >
            {getDoorUnlockForm(doors, selectedDoorId, onSelectDoorId, isSubmitting)}
          </Flex>
        </form>
        <ErrorCallout errorMessage={errorMessage} />
      </Container>
    </>
  );
}

