import React from 'react';
import styled from 'styled-components';

const theme = { width: "27px" }

export const NavBar = ({ toggleModal }) => {
  return (
    <Wrapper onClick={() => toggleModal()}>
      <NavIcon></NavIcon>
      <NavIcon theme={theme}></NavIcon>
      <NavIcon></NavIcon>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  cursor: pointer;
  padding-top: 2.5em;
`;
const NavIcon = styled.div`
  width: ${props => props.theme.width};
  height: 0px;
  border: 1px solid #3D3C3C;
  margin-bottom: 7px;
  opacity: 1;
`;
NavIcon.defaultProps = {
  theme: {
    width: "20px"
  }
}

