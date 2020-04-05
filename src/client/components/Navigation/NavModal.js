import React from 'react';
import styled from 'styled-components';
import ProfilePic from '../../assets/profile.png';
import DashboardIcon from '../../assets/dashboard.svg';
import TransferIcon from '../../assets/transfer.svg';
import CreditIcon from '../../assets/plainCredit.png';
import DebitIcon from '../../assets/plainDebit.png';
import SettingsIcon from '../../assets/gear.svg';
import ArrowIcon from '../../assets/arrow.svg';

const USER = "Habib Korede"
const ROLE = "Product Designer"
const DASHBOARD = "Dashboard"
const TRANSFERS = " Transfers"
const CREDITS = "Credits"
const DEBITS = "Debits"
const SETTINGS = "Settings"
const SIGN_OUT = "Sign Out"
const navLinks = [
  {
    image: DashboardIcon,
    title: DASHBOARD
  },
  {
    image: TransferIcon,
    title: TRANSFERS
  },
  {
    image: CreditIcon,
    title: CREDITS
  },
  {
    image: DebitIcon,
    title: DEBITS
  }
]
const afterNavLInks = [
  {
    image: SettingsIcon,
    title: SETTINGS
  },
  {
    image: ArrowIcon,
    title: SIGN_OUT
  },
]

export const NavModal = ({ toggleModal }) => (
  <Nav>
    <div className="profile">
      <img src={ProfilePic} alt="profile" />
      <div className="user-name">
        <h3>{USER}</h3>
        <p>{ROLE}</p>
      </div>
      <span className="close" onClick={() => toggleModal()}></span>
    </div>
    <div className="nav-link">
      {navLinks.map((navLink, index) => {
        const { title, image } = navLink
        return (
          <div key={index}>
            <img src={image} alt="" />
            <span>{title}</span>
          </div>
        )
      })}
    </div>
    <hr />
    <div className="nav-link">
      {afterNavLInks.map((navLink, index) => {
        const { title, image } = navLink
        return (
          <div key={index}>
            <img src={image} alt="" />
            <span>{title}</span>
          </div>
        )
      })}
    </div>
  </Nav>
)

const Nav = styled.div`
  padding: 1em;
  .profile{
    display: flex;
    justfy-content: space-between;
    width:100%;
  }
 .user-name {
  line-height: 0.5;
 }
  .user-name h3 {
    font:-family: 'Helvetica', 'Neue LT Std';
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0px;
    color: #3D3C3C;
  }
  .user-name p {
    font-family: 'Roman', 'Helvetica', 'Neue LT Std';
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0px;
    color: #717D7C;
  }
  .close {
    position: absolute;
    right: 25px;
    top: 25px;
    width: 20px;
    height: 20px;
    opacity: 0.6;
    cursor: pointer;
    color: #3D3C3C;
  }
  .close:hover {
    opacity: 1;
  }
  .close:before, .close:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #333;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
  .nav-link {
    font-family: 'Helvetica', ' Neue LT Std';
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0px;
    color: #3D3C3C;
    line-height: 4;
    margin-top: 4em;
    span {
      margin-left: 2em;
    }
    padding: 1em;
  }

  hr {
    width: 214px;
    height: 0px;
    border: 1px solid #D9DBDB;
    margin-top: 200px;;
  }
`;