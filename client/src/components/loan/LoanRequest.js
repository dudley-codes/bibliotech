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

  // Saves new loan
  const saveNewLoanRequest = () => {
    setIsLoading(true)
    loan.bookId = parseInt(id);
    loan.ownerId = book.ownerId;
    addLoan(loan).then(() => {
      fetchLoans()
      setIsLoading(false)
    })
  }

  //cancel loan request
  const cancelRequest = () => {
    setIsLoading(true)
    cancelLoanRequest(existingLoan.id).then(() => {
      fetchLoans()
      setIsLoading(false)
    })
  }


  if (existingLoan.id === 0) {
    return (
      <Button aria-disabled={ isLoading } onClick={ saveNewLoanRequest }>
        Request Loan
      </Button>)
  }
  else if (existingLoan?.loanStatus?.status === 'IsRequested') {
    return (
      <Button aria-disabled={ isLoading } variant="danger" onClick={ cancelRequest }>
        Cancel Request
      </Button>
    )
  } else if (existingLoan?.loanStatus?.status === 'IsApproved') {
    return (
      <>
        <Button aria-disabled={ true } variant="danger" onClick={ cancelRequest }>
          Cancel Request
        </Button>
        <div>The loan has been approved. Contact the book owner if you no longer wish to borrow this book.</div>
      </>
    )
  }
  else return null;
}

export default LoanRequest;