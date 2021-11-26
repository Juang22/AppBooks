import React from 'react';
import { MenuPublic } from '../MenuPublic';
import { Menu } from '../Menu';
import { useAuthContext } from '../../context/AuthContext/AuthContext';

function Header() {
  const { userLoggedIn } = useAuthContext();
  return <div>{userLoggedIn === false ? <MenuPublic /> : <Menu />}</div>;
}

export default Header;
