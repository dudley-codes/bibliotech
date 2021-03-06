import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { dateFixer } from "../../modules/helpers";
import { cancelLoanRequest } from "../../modules/loanManager";

const UserLoan = ({ loan, fetchAllButDeleted }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const requestDate = dateFixer(loan?.requestDate);
  const returnDate = dateFixer(loan?.returnDate);

  //cancel loan request
  const cancelRequest = (id) => {
    setIsLoading(true);
    cancelLoanRequest(id).then(() => fetchAllButDeleted(id)).then(() => setIsLoading(false));
  }

  if (loan.loanStatus.status === 'IsReturned') {
    return (
      <>
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
                <div>Request Date: { requestDate }</div>
                <div>Returned: { returnDate }</div>
                <div>Owner: { loan?.owner?.fullName }</div>
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button onClick={ () => cancelRequest(loan.id) } variant='cancel'>Remove From List</Button>
          </Card.Footer>
        </Card>
      </>
    )
  }
  else if (loan.loanStatus.status === 'IsRequested' && loan?.book.isDeleted === false) {
    return (
      <>
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
                <div className='loan-dates'>
                  <div>Request Date: { requestDate }</div>
                </div>
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button onClick={ () => cancelRequest(loan.id) } variant='cancel'>Cancel Request</Button>
          </Card.Footer>
        </Card>
      </>
    )
  }
  else if (loan.loanStatus.status === 'IsApproved' && loan?.book.isDeleted === false) {
    return (
      <>
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
                <div className='loan-dates'>
                  <div>Request Date: { requestDate }</div>
                  <div>Due Back: { dateFixer(loan.dueDate) }</div>
                  <div><b>Loan approved!</b></div>
                </div>
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <a href={ "mailto:" + loan.owner?.email }>
              <Button variant='search' >Contact Owner</Button>
            </a>
          </Card.Footer>
        </Card>
      </>
    )
  }
  else if (loan.loanStatus.status === 'IsDenied' && loan?.book.isDeleted === false) {
    return (
      <>
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
                <div>Request Date: { requestDate }</div>
                <div>{ loan?.owner?.fullName } has denied your loan request.</div>
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button variant='cancel' onClick={ () => cancelRequest(loan.id) } >Delete Request</Button>
          </Card.Footer>
        </Card>
      </>
    )
  }
  else if (loan?.book.isDeleted === true) {
    return (
      <>
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
                <div>Request Date: { requestDate }</div>
                <div><em><b>Book no longer available.</b></em></div>
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button onClick={ () => cancelRequest(loan.id) } variant='cancel'>Delete Request</Button>
          </Card.Footer>
        </Card>
      </>
    )
  }
  else return null;

};

export default UserLoan;