import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import BankLogo from '../../assets/bankLogo.png';
import CreditLogo from '../../assets/credit.png';
import DebitLogo from '../../assets/debit.png';
import { formattedAmount, sumTotal } from '../../utils';

const TOTAL_BALANCE = "Total Balance";
const TOTAL_CREDITS = "Total Credits"
const TOTAL_DEBITS = "Total Debits"
const BTN_LABEL = "Connect Your Bank";
let creditTxn = []
let debitTxn = []

export const TxnSummary = ({ transactions }) => {
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    calcTotalAmt()
    calcTotalByType()
  }, [])

  const calcTotalAmt = () => {
    const totalAmt = sumTotal(transactions, 'amount')
    setTotalAmount(formattedAmount(totalAmt))
  }

  const getTransactionsByType = () => {
    transactions.map(transaction => {
      if (transaction.type === 'Credit') {
        creditTxn = [...creditTxn, transaction]
      }
      if (transaction.type === 'Debit') {
        debitTxn = [...debitTxn, transaction]
      }
    })
  }

  const calcTotalByType = () => {
    getTransactionsByType()

    // get sum of all credit
    const totalCredit = sumTotal(creditTxn, 'amount')
    setTotalCredit(formattedAmount(totalCredit))

    // get sum of all debit
    const totalDebit = sumTotal(debitTxn, 'amount')
    setTotalDebit(formattedAmount(totalDebit))
  }

  return (
    <Wrapper>
      <div className="top">
        <p>{TOTAL_BALANCE}</p>
        <h1>{totalAmount}</h1>
        <img src={BankLogo} alt="bank logo" />
      </div>
      <hr />
      <Total>
        <Credits>
          <p>{TOTAL_CREDITS}</p>
          <span>
            <img src={CreditLogo} alt="credit" />
            <h2>{totalCredit}</h2>
          </span>
        </Credits>
        <Debits>
          <p>{TOTAL_DEBITS}</p>
          <span>
            <img src={DebitLogo} alt="debit" />
            <h2>{totalDebit}</h2>
          </span>
        </Debits>
      </Total>
      <BtnWrapper>{BTN_LABEL}</BtnWrapper>
    </Wrapper >
  )
}

const Wrapper = styled.div`
top: 141px;
left: 40px;
height: 342px;
.top{
  line-height: 0.5
}
p{
  font-family: 'Roman', 'Helvetica', 'Neue LT Std';
  font-weight: 300;
  font-size: 14px;
  letter-spacing: 0px;
  color: #717D7C;
}
h1{
  font-family: 'Helvetica', 'Neue LT Std';
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 0px;
  color: #3D3C3C;
}
hr{
  border: 1px solid #D9DBDB;
  width: 296px;
  height: 0px;
  margin-top: 2em;
  margin-bottom: 2em;
}
`;
const Total = styled.div`
  display: flex;
  justify-content: space-between;
  Credits, Debits p{
    font-family: 'Roman', Helvetica, 'Neue LT Std';
    font-weight:300;
    font-size: 12px;
    letter-spacing: 0px;
    color: #717D7C;
    margin-top: 0;
  }
  span {
    display: flex;
    width: 100%;
  }
  span h2{
    font: 'Helvetica', 'Neue LT Std';
    font-size: 20px;
    font-weight: 300;
    letter-spacing: 0px;
    color: #3D3C3C;
    margin-top: 0;
    padding-left: 5px;
  }
  img{
    height: fit-content;
  }
`;

const Credits = styled.div`
span {
  padding-left: 2em;
}
p{
  padding-left: 4em;
}
`;
const Debits = styled.div`
span{
  padding-right: 2em;
}
`;
const BtnWrapper = styled.button`
  top: 433px;
  left: 84px;
  width: 208px;
  height: 50px;
  cursor: pointer;
  background: #39B54A 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  text-align: center;
  font-family: 'Open Sans', Roboto;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0px;
  color: #FFFFFF;
  margin: 2em;
  outline: none;
`;