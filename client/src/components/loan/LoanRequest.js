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
  console.log('book', book)
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

  // When called, closes the Modal
  const handleClose = () => {
    setShow(false)
  };

  // Executes the modal
  const handleShow = () => setShow(true);


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
        <Button aria-disabled={ isLoading } variant="danger" onClick={ () => handleShow() }>
          Cancel Request
        </Button>
        <Modal show={ show } onHide={ handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>Sorry, you can't do that!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>The loan has been approved. Contact { book?.owner?.firstName + ' ' + book?.owner?.lastName } if you no longer wish to borrow this book.</div>
          </Modal.Body>
          <Modal.Footer>
            <div className='button-container'>
              <div className='button-container__save'>
                <Button
                  variant="secondary"
                  onClick={ handleClose }>
                  Close
                </Button>
                <a href={ "mailto:" + book?.owner.email }>
                  <Button >Contact</Button>
                </a>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
  else return null;
}

export default LoanRequest;