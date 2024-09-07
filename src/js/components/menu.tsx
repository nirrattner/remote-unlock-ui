import React  from 'react';
import {
  useNavigate,
} from 'react-router-dom';

import {
  DropdownMenu,
  IconButton,
  Flex,
} from '@radix-ui/themes';
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

import * as auth from '../lib/auth';

export default function Menu() {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    auth.deleteKey();
    navigate('/login');
  }

  return (
    <Flex 
        pr="30px"
        pt="30px"
        justify="end"
    >
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost">
            <HamburgerMenuIcon width="25" height="25" />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={onLogoutClick}>Logout</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
}

