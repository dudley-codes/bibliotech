import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { dateFixer } from "../../modules/helpers";
import { cancelLoanRequest } from "../../modules/loanManager";
import LoanRequest from "./LoanRequest";

const UserLoan = ({ loan, fetchLoans }) => {
  const [ isLoading, setIsLoading ] = useState(false)




  const requestDate = dateFixer(loan.requestDate)
  const [ currentStatus, setCurrentStatus ] = useState("");

  const LoanStatus = () => {
    //todo add all statuses to switch statement
    switch (loan.loanStatus.status) {
      case "IsRequested":
        setCurrentStatus("Requested")
        return <Button onClick={ cancelRequest } variant='danger'>Cancel Request</Button>
        break;
      case "IsBorrowed":
        setCurrentStatus("On Loan")
        return <div>Due: { dateFixer(loan.dueDate) }</div>
        break;
      case "IsApproved":
        setCurrentStatus("Loan Aproved")
        return (
          <>
            <div>Due: { dateFixer(loan.dueDate) }</div>
            <div>Congratulations, your loan request has been approved!</div>
            <br />
            <div>Email { loan.owner.displayName } to arrange pickup and return: { loan.owner.email }</div>
          </>
        )
        break;
      case "IsDenied":
        return (
          <>
            <div>The user has denied the loan request.</div>
            <Button onClick={ cancelRequest } variant='danger'>Delete Request</Button>
          </>
        )
        break;
      default: return null
        break;
    }
  }

  console.log('loan', loan)

  useEffect(() => {
    LoanStatus()
  }, [ loan ])

  //cancel loan request
  const cancelRequest = () => {
    setIsLoading(true)
    cancelLoanRequest(loan.id).then(() => {
      fetchLoans()
      setIsLoading(false)
    })
  }

  const bookIsDeleted = (
    <>
      <div>This book is no longer available. Sorry for the inconvenience.</div>
      <Button onClick={ cancelRequest } variant='danger'>Delete Request</Button>
    </>
  );

  const loanIsDenied = (
    <>
      <div>The user has denied the loan request.</div>
      <Button onClick={ cancelRequest } variant='danger'>Delete Request</Button>
    </>
  )

  return (
    <>
      <Card>
        <Card.Body>
          <h3>{ loan?.book.title }</h3>
          <div>Status: { currentStatus }</div>
          <div>Requested On: { requestDate }</div>
          { loan?.book.isDeleted ?
            bookIsDeleted
            : null }
          <LoanStatus />
        </Card.Body>
      </Card>

    </>
  )
};

export default UserLoan;