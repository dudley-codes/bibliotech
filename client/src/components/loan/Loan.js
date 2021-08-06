import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { dateFixer } from "../../modules/helpers";
import { updateLoanStatus } from "../../modules/loanManager";
import Modal from 'react-bootstrap/Modal';

const Loan = ({ loan, fetchLoans }) => {
  const [ show, setShow ] = useState(false);
  const [ loanEdit, setLoanEdit ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);
  const [ currentStatus, setCurrentStatus ] = useState("");

  // When called, closes the Modal
  const handleClose = () => {
    setShow(false)
  };

  // Executes the modal
  const handleShow = () => setShow(true);

  // Sets the entry to be edited
  const handleControlledInputChange = (e) => {
    const newLoan = { ...loan };
    let selectedVal = e.target.value;
    newLoan.dueDateUnix = Date.parse(selectedVal) / 1000;
    newLoan.ownerId = loan.owner.id;
    newLoan.borrowerId = loan.borrower.id
    setLoanEdit(newLoan)
  }

  const requestDate = dateFixer(loan.requestDate)

  const statusSwitch = () => {
    switch (loan.loanStatus.status) {
      case "IsRequested":
        setCurrentStatus("Requested")
        break;
      case "IsBorrowed":
        setCurrentStatus("On Loan")
        break;
      case "IsApproved":
        setCurrentStatus("Approved")
        break;
      case "IsDenied":
        setCurrentStatus("Denied")
        break;
      case "IsReturned":
        setCurrentStatus("Book Returned")
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    statusSwitch()
  }, [ loan ])

  const handleLoanApprove = () => {
    loanEdit.loanStatus.status = 'IsApproved';
    updateLoanStatus(loanEdit).then(() => {
      handleClose()
      fetchLoans()
    })
  }

  const status =
  {
    id: loan.id,
    ownerId: loan.owner.id,
    borrowerId: loan.borrower.id,
    loanStatus: {
      status: ''
    }
  }

  const handleLoanUpdate = (newStatus) => {
    status.loanStatus.status = newStatus;
    updateLoanStatus(status).then(fetchLoans)
  }

  return (
    <>
      {/* Only */ }

      <Card className="loan-card">
        <Card.Body className="loan-card__body">
          <div className='book-info__loan'>
            <div className='book-thumb'>
              <img src={ loan.book.thumbnailUrl } alt='book thumbnail' />
            </div>
            <div className='book-info'>
              <div><b>{ loan?.book.title }</b></div>
              {
                loan?.book.authors?.map(a =>
                  <div><em>{ a.name }</em></div>
                )
              }
              <br />
              <div>Requested By: { loan?.borrower?.fullName }</div>
              <div>Requested On: { requestDate }</div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          { loan.loanStatus.status === "IsApproved" ?
            <>
              <a href={ "mailto:" + loan.borrower?.email }>
                <Button variant='search' >Contact User</Button>
              </a>
              <Button variant='cancel' onClick={ () => handleLoanUpdate('IsReturned') }>Book Returned</Button>
            </> :
            <>
              <Button variant='search' onClick={ () => handleShow() }>Approve</Button>

              <Button variant='cancel' onClick={ () => handleLoanUpdate('IsDenied') }>Deny</Button>
            </> }
        </Card.Footer>
      </Card>


      <Modal show={ show } onHide={ handleClose }>
        <Modal.Header className='biblio-modal' closeButton>
          <Modal.Title>Choose a Due Date</Modal.Title>
        </Modal.Header>
        <Modal.Body className='biblio-modal'>
          <form>
            <fieldset>
              <div className='habit-form__group'>
                <label htmlFor='returnDate'>Return Date:</label>
                <input
                  type='date'
                  required
                  id='returnDate'
                  onChange={ handleControlledInputChange }
                  autoFocus
                  className='form-control biblio-modal__date'
                  defaultValue={ loan.date }
                />
              </div>
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer className='biblio-modal'>
          <div className='button-container'>
            <div className='button-container__save'>
              <Button
                variant="cancel"
                onClick={ handleClose }>
                Cancel
              </Button>
              <Button
                variant="search"
                onClick={ handleLoanApprove }
                disabled={ isLoading }
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default Loan;