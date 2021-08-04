import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { dateFixer } from "../../modules/helpers";
import { cancelLoanRequest } from "../../modules/loanManager";
import { Spinner } from "react-bootstrap";

const UserLoan = ({ loan, loans, fetchLoans, fetchAllButDeleted }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const requestDate = dateFixer(loan.requestDate);
  const [ status, setStatus ] = useState(null);

  //Checks loan status and returns loan info based on status
  let newStatus = '';
  const loanStatus = () => {
    switch (loan.loanStatus.status) {
      //If book has been returned, book will remain on list until user removes it
      case "IsReturned":
        newStatus = <Button onClick={ () => cancelRequest(loan.id) } variant='danger'>Remove From List</Button>;
        setStatus(newStatus)
        break;
      //Render cancel button and request date once book has been requested
      case "IsRequested":
        newStatus = (
          <>
            <div>Request Date: { requestDate }</div>
            <Card.Footer>
              <Button onClick={ () => cancelRequest(loan.id) } variant='danger'>Cancel Request</Button>
            </Card.Footer>
          </>
        )
        if (loan?.book.isDeleted === false) {
          setStatus(newStatus)
        }
        break;
      //Render user contact information once loan has been approved
      case "IsApproved":
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
      //Render cancellation notice if loan has been cancelled and allow user to delete book
      case "IsDenied":
        newStatus = (
          <>
            <div>{ loan.owner.displayName } has denied your loan request.</div>
            <Card.Footer>
              <Button onClick={ () => cancelRequest(loan.id) } variant='danger'>Delete Request</Button>
            </Card.Footer>
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

  // console.log('index', loans.findIndex(loan))
  //cancel loan request
  const cancelRequest = (id) => {
    setIsLoading(true);

    cancelLoanRequest(id).then(() => fetchAllButDeleted(id)).then(() => setIsLoading(false));

  }

  //If a book has been deleted from the db with an active loan, display message
  const bookIsDeleted = (
    <>
      <div>This book is no longer available.</div>
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