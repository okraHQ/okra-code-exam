// React Redux module imports
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { dispatchActions } from 'unified-redux-wrapper'
// Style import
import styled from 'styled-components';
// Local import
import { NavBar, NavModal } from '../Navigation';
import { TxnSummary, TxnHistory } from '../Transactions'
import { MainLogo } from '../../commons';
import { actionDictionary } from '../../actions';
import { url, makeRequest } from '../../api';

class Home extends React.Component {
  state = {
    openModal: false,
    transactions: ''
  }
  componentDidMount() {
    this.fetchTranscations()
  }

  componentDidUpdate(prevProps, prevState) {
    const nextProps = this.props;
    const nextState = this.state;
    const donothing = () => { }

    const fetchAllTranscations =
      prevProps.getAllTransactionsPending &&
        nextProps.getAllTransactionsPayload &&
        !nextProps.getAllTransactionsError
        ? this.setTransactionToState
        : donothing

    fetchAllTranscations.call(this)
  }

  toggleModal = () => {
    const { openModal } = this.state
    this.setState({ openModal: !openModal })
  }

  fetchTranscations = () => {
    const { dispatchActions } = this.props;
    const { getTransaction } = url
    dispatchActions('GET_ALL_TRANSACTIONS', makeRequest, true, [getTransaction()], actionDictionary)
  }

  setTransactionToState = () => {
    const { getAllTransactionsPayload } = this.props
    this.setState({
      transactions: getAllTransactionsPayload && getAllTransactionsPayload.results
    })
  }

  render() {
    const { toggleModal, state } = this
    const { openModal, transactions } = state
    return (
      transactions && transactions.length &&
      <Landing>
        {openModal &&
          <div className="modal">
            <NavModal toggleModal={toggleModal} />
          </div>
        }
        <div className="main-page">
          <TopWrapper>
            <div className="head">
              <NavBar toggleModal={toggleModal} />
              <MainLogo toggleModal={toggleModal} />
            </div>
            <div className="summary">
              <TxnSummary transactions={transactions} />
            </div>
          </TopWrapper>
          <TxnHistory transactions={transactions} />
        </div>
      </Landing>
    )
  }
}
const Landing = styled.div`
  position: relative;

  .modal, .main-page {
    top: 0px;
    width: 375px;
    height: 853px;
    left: 50%;
    background: #F8F9F9 0% 0% no-repeat padding-box;  
    box-shadow: 0px 3px 5px #00000008;
    opacity: 1;
    position: absolute;
    right: 50%;
    margin-left: -190px;
  }
  .modal {
    z-index: 3;
    width: 278px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
  }
`;

const TopWrapper = styled.div`
  height: 523px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 5px #00000008;
  border-radius: 0px 0px 30px 30px;
  padding: 1em;
  .head{
    display: flex;
    justify-content: space-between;
  } 
  .summary{
    text-align: center;
  }
`

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ dispatchActions }, dispatch);
};

const mapStateToProps = ({ getAllTransactions }) => ({
  getAllTransactionsPending: getAllTransactions.pending,
  getAllTransactionsError: getAllTransactions.error,
  getAllTransactionsPayload: getAllTransactions.payload
});
export default connect(mapStateToProps, mapDispatchToProps)(Home)
