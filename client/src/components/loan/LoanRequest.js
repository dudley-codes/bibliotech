import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useParams, useHistory } from 'react-router-dom'
import { addLoan } from '../../modules/loanManager'
import { getBookById } from '../../modules/bookManager';
import firebase from "firebase/app";
import "firebase/auth";
import { Label } from 'reactstrap';
import { Alert } from 'react-bootstrap';


const LoanRequest = ({ fetchBook, book }) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ show, setShow ] = useState(false)
  const [ loan, setLoan ] = useState({})
  // const [ book, setBook ] = useState({})
  const { id } = useParams();

  // TODO: Set backend logic to send only current user loans
  const LoanButton = () => {
    let button = null;
    book?.loans?.map(l => {

      if (l.loanStatus.status !== 'IsRequested') {
        button =
          <Button onClick={ saveNewLoanRequest }>
            Request Loan
          </Button>

      }
      else if (l.loanStatus.status === 'IsRequested') {
        button =
          <Button variant="danger">
            Cancel Request
          </Button>
      }
      else button = null;
    })
    return button
  }
  // const fetchBook = () => {
  //   getBookById(id).then(b => setBook(b));
  // }

  // useEffect(() => {
  //   fetchBook()
  // }, [])


  // Saves new habit 
  const saveNewLoanRequest = () => {
    setIsLoading(true)
    loan.bookId = parseInt(id);
    loan.ownerId = book.ownerId;
    addLoan(loan)
  }

  console.log('book', book.loans)

  return (
    <LoanButton />
  )
}

export default LoanRequest;