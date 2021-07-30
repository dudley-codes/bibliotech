import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { dateFixer } from "../../modules/helpers";
import { cancelLoanRequest } from "../../modules/loanManager";
import LoanRequest from "./LoanRequest";
import { Link } from "react-router-dom";

const UserLoan = ({ loan, fetchLoans }) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const requestDate = dateFixer(loan.requestDate)
  const [ currentStatus, setCurrentStatus ] = useState("");

  //Checks loan status and returns loan info based on status
  const LoanStatus = () => {
    //todo add all statuses to switch statement
    switch (loan.loanStatus.status) {
      case "IsReturned":
        setCurrentStatus("Returned")
        return <Button onClick={ cancelRequest } variant='danger'>Remove From List</Button>;
      case "IsRequested":
        setCurrentStatus("Requested")
        return <Button onClick={ cancelRequest } variant='danger'>Cancel Request</Button>
      case "IsBorrowed":
        setCurrentStatus("On Loan")
        return <div>Due: { dateFixer(loan.dueDate) }</div>
      case "IsApproved":
        setCurrentStatus("Loan Aproved")
        return (
          <>
            <div>Due: { dateFixer(loan.dueDate) }</div>
            <div>Congratulations, your loan request has been approved!</div>
            <br />
            <div>Email { loan.owner.displayName } to arrange pickup and return:
              <a href={ "mailto:" + loan.owner.email }> { loan.owner.email }</a>
            </div>
          </>
        )
      case "IsDenied":
        return (
          <>
            <div>{ loan.owner.displayName } has denied your loan request.</div>
            <Button onClick={ cancelRequest } variant='danger'>Delete Request</Button>
          </>
        )
      default: return null
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    LoanStatus()
  }, [ loan ])

  //cancel loan request
  const cancelRequest = () => {
    setIsLoading(true)
    cancelLoanRequest(loan.id).then(sleep(1000)).then(() => {
      fetchLoans()
      setIsLoading(false)
    })
  }

  //If a book has been deleted from the db with an active loan, display message
  const bookIsDeleted = (
    <>
      <div>This book is no longer available. Sorry for the inconvenience.</div>
      <Button onClick={ cancelRequest } variant='danger'>Delete Request</Button>
    </>
  );

  return (
    <>
      <Card>
        <Card.Body>
          <h4>{ loan?.book.title }</h4>
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