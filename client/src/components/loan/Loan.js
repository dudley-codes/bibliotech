import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";
import { dateFixer } from "../../modules/helpers";
import { updateLoanStatus } from "../../modules/loanManager";

const Loan = ({ loan, fetchLoans }) => {
  const [ status, setStatus ] = useState({});
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
      default:
        break;
    }
  }

  useEffect(() => {
    statusSwitch()
  }, [ loan ])

  const handleLoanSave = () => {
    updateLoanStatus({
      id: loan.id,
      ownerId: loan.owner.id,
      borrowerId: loan.borrower.id,
      loanStatus: {
        status: 'IsApproved'
      }
    }).then(fetchLoans).then(statusSwitch)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h3>{ loan?.borrower.displayName }</h3>
          <h4>Status: { currentStatus }</h4>
          <h4>Requested On: { requestDate }</h4>

          <Button onClick={ () => handleLoanSave() }>
            Approve
          </Button>
        </Card.Body>
      </Card>
    </>
  )
};

export default Loan;