import React from 'react';
import Logo from '../assets/logo.png'
import styled from 'styled-components';

export const MainLogo = () => (
  <React.Fragment>
    <LogoIcon>
      <img src={Logo} alt="company logo" />
    </LogoIcon>
    <div></div>
  </React.Fragment>
)

const LogoIcon = styled.div`
  padding: 1em 2em 1em 0;
`;
