import React from 'react';
import styled from 'styled-components';
import CreditLogo from '../../assets/credit.png';
import DebitLogo from '../../assets/debit.png';
import { formattedAmount, convertDate } from '../../utils';

const TXNS_HISTORY = "Transactions History"

export const TxnHistory = ({ transactions }) => {
  return (
    <History>
      <p>{TXNS_HISTORY}</p>
      <div className="detail">
        {transactions.map((transaction, index) => {
          const {title, type, date, amount} = transaction
          return (
          <Card key={index}>
            <div className="wrap">
              <div key={index} className="space-between big-font">
                <span>{title}</span>
                <span className={type === 'Credit' ? 'green-color' : 'red-color'}>{formattedAmount(amount)}</span>
              </div>
              <div className="space-between small-font">
                <span>{convertDate(date)}</span>
                <span>
                  <img src={type === "Credit" ? CreditLogo : DebitLogo} alt="logo" />
                  <span className="type">{type}</span>
                </span>
              </div>
            </div>
          </Card>
        )})}
      </div>
    </History>
  )
}
const History = styled.div`
  p{
    top: 544px;
    left: 40px;
    width: 145px;
    height: 18px;
    font-family: 'Roman', 'Helvetica', ' Neue LT Std';
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0px;
    color: #717D7C;
    padding-left: 2em;
    }
    .wrap{
      padding: 10px 2em;
    }
    .detail{
      overflow-y: scroll;
      max-height: 250px;
    }
`;

const Card = styled.div`
  margin:auto;
  width: 345px;
  height: 65px;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #00000008;
  border-radius: 5px;
  margin-bottom: 1em;
  .space-between{
    display: flex;
    justify-content: space-between;
  }
  .big-font{
    font-family: 'Helvetica', 'Neue LT Std';
    font-size: 16px;
    font-weight: 300;
    color: #3D3C3C;
  }
  .small-font{
    font-family: 'Roman', 'Helvetica' 'Neue LT Std';
    font-size: 12px;
    font-family: 300;
    letter-spacing: 0px;
    color: #717D7C;
    margin-top: 8px;
  }
  .green-color{
    color: #39B54A;
  }
  .red-color{
    color: #ED1A3B;
  }
  img{
    max-width: 40%;
    max-height: 40%;
  }
  .type{
    margin-top: -5px;
    top: -3px;
  }
`;
