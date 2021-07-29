import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useParams, useHistory } from 'react-router-dom'
import { addLoan, cancelLoanRequest, getLoanRequest } from '../../modules/loanManager'

const LoanRequest = ({ fetchBook, book }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ show, setShow ] = useState(false);
  const [ loan, setLoan ] = useState({});
  const [ existingLoan, setExistingLoan ] = useState({});
  // const [ book, setBook ] = useState({})
  const { id } = useParams();

  const fetchLoans = () => {
    getLoanRequest(id).then(res => setExistingLoan(res))
  }

  useEffect(() => {
    fetchLoans()
  }, [])
  //todo delete console log
  console.log('existing loan', existingLoan)

  // TODO: Set backend logic to send only current user loans
  const LoanButton = () => {
    let button = null;

    if (existingLoan.id === 0) {
      button =
        <Button onClick={ saveNewLoanRequest }>
          Request Loan
        </Button>
    }
    else if (existingLoan?.loanStatus?.status === 'IsRequested') {
      button =
        <Button variant="danger" onClick={ cancelRequest }>
          Cancel Request
        </Button>
    }
    else button = null;

    return button
  }
  // const fetchBook = () => {
  //   getBookById(id).then(b => setBook(b));
  // }

  // useEffect(() => {
  //   fetchBook()
  // }, [])


  // Saves new loan
  const saveNewLoanRequest = () => {
    setIsLoading(true)
    loan.bookId = parseInt(id);
    loan.ownerId = book.ownerId;
    addLoan(loan)
  }

  //cancel loan request
  const cancelRequest = () => {
    cancelLoanRequest(existingLoan.id)
  }

  return (
    <LoanButton />
  )
}

export default LoanRequest;