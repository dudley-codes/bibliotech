import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";
import { dateFixer } from "../../modules/helpers";
import { updateLoanStatus } from "../../modules/loanManager";

const Loan = ({ loan, fetchLoans }) => {
  const [ status, setStatus ] = useState(
    {
      id: loan.id,
      ownerId: loan.owner.id,
      borrowerId: loan.borrower.id,
      loanStatus: {
        status: ''
      }
    });
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
    status.loanStatus.status = 'IsApproved';
    updateLoanStatus(status).then(fetchLoans)
  }

  const handleLoanDeny = () => {
    status.loanStatus.status = 'IsDenied';
    console.log('status', status)
    updateLoanStatus(status).then(fetchLoans)
  }


  return (
    <>
      <Card>
        <Card.Body>
          <h3>{ loan?.borrower.displayName }</h3>
          <h4>Status: { currentStatus }</h4>
          <h4>Requested On: { requestDate }</h4>

          <Button onClick={ () => handleLoanApprove() }>
            Approve
          </Button>

          <Button variant="danger" onClick={ () => handleLoanDeny() }>
            Deny
          </Button>
        </Card.Body>
      </Card>
    </>
  )
};

export default Loan;