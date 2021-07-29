import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { dateFixer } from "../../modules/helpers";
import { updateLoanStatus } from "../../modules/loanManager";
import Modal from 'react-bootstrap/Modal';

const Loan = ({ loan, fetchLoans }) => {
  const [ show, setShow ] = useState(false);
  const [ loanEdit, setLoanEdit ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false)
  const [ status, setStatus ] = useState(
    {
      id: loan.id,
      ownerId: loan.owner.id,
      borrowerId: loan.borrower.id,
      loanStatus: {
        status: ''
      }
    });

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
  const [ currentStatus, setCurrentStatus ] = useState("");

  const statusSwitch = () => {
    //todo add all statuses to switch statement
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

  const handleLoanDeny = () => {
    status.loanStatus.status = 'IsDenied';
    updateLoanStatus(status).then(fetchLoans)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h3>{ loan?.borrower.displayName }</h3>
          <h4>Status: { currentStatus }</h4>
          <h4>Requested On: { requestDate }</h4>

          <Button onClick={ () => handleShow() }>
            Approve
          </Button>

          <Button variant="danger" onClick={ () => handleLoanDeny() }>
            Deny
          </Button>
        </Card.Body>
      </Card>

      <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Submit Loan Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  className='form-control'
                  defaultValue={ loan.date }
                />
              </div>
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className='button-container'>
            <div className='button-container__save'>
              <Button
                variant="secondary"
                onClick={ handleClose }>
                Close
              </Button>
              <Button
                variant="primary"
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