import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { dateFixer } from "../../modules/helpers";
import { cancelLoanRequest } from "../../modules/loanManager";

const UserLoan = ({ loan, fetchLoans, cancelRequest }) => {

  const requestDate = dateFixer(loan.requestDate);
  const [ currentStatus, setCurrentStatus ] = useState("");
  const [ status, setStatus ] = useState(null);

  console.log('loan', loan)
  //Checks loan status and returns loan info based on status
  let newStatus = '';
  const loanStatus = () => {
    //todo add all statuses to switch statement
    switch (loan.loanStatus.status) {
      case "IsReturned":
        setCurrentStatus("Returned")
        newStatus = <Button onClick={ () => cancelRequest(loan.id) } variant='danger'>Remove From List</Button>;
        setStatus(newStatus)
        break;
      case "IsRequested":
        setCurrentStatus("Requested")
        newStatus = (
          <>
            <div>Request Date: { requestDate }</div>
            <div>Your loan request has been submitted! You will be notified when { loan.owner.displayName } responds.</div>
            <Button onClick={ () => cancelRequest(loan.id) } variant='danger'>Cancel Request</Button>
          </>
        )
        if (loan?.book.isDeleted === false) {
          setStatus(newStatus)
        }
        break;
      case "IsBorrowed":
        setCurrentStatus("On Loan")
        newStatus = <div>Due: { dateFixer(loan.dueDate) }</div>
        setStatus(newStatus)
        break;
      case "IsApproved":
        setCurrentStatus("Loan Approved")
        newStatus = (
          <>
            <div>Due Back: { dateFixer(loan.dueDate) }</div>
            <div><b>Your loan has been approved!</b></div>
            <br />
            <div>Email { loan.owner.displayName } to arrange pickup / drop off:
              <a href={ "mailto:" + loan.owner.email }> { loan.owner.email }</a>
            </div>
          </>
        )
        setStatus(newStatus)
        break;
      case "IsDenied":
        setCurrentStatus("Loan Denied")
        newStatus = (
          <>
            <div>{ loan.owner.displayName } has denied your loan request.</div>
            <Button onClick={ () => cancelRequest(loan.id) } variant='danger'>Delete Request</Button>
          </>
        )
        setStatus(newStatus)
        break;
      default: newStatus = ''
        break;
    }
  }

  useEffect(() => {
    loanStatus()
  }, [])

  //If a book has been deleted from the db with an active loan, display message
  const bookIsDeleted = (
    <>
      <div>This book is no longer available. Sorry for the inconvenience.</div>
      <Button onClick={ () => cancelRequest(loan.id) } variant='danger'>Delete Request</Button>
    </>
  );

  return (
    <>
      <Card className="loan-card">
        <Card.Body className="loan-card__body">
          <div><b>{ loan?.book.title }</b></div>

          {
            loan?.book.authors?.map(a =>
              <div><em>{ a.name }</em></div>
            )
          }
          <br />

          { loan?.book.isDeleted && loan.loanStatus.status !== "IsDenied" ?
            bookIsDeleted
            : null }
          { status }
        </Card.Body>
      </Card>
    </>
  )
};

export default UserLoan;