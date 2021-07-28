import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { dateFixer } from "../../modules/helpers";

const Loan = ({ loan }) => {
  const requestDate = dateFixer(loan.requestDate)
  let loanStatus;
  //todo add all statuses to switch statement
  switch (loan.loanStatus.status) {
    case "IsRequested":
      loanStatus = "Requested"
      break;
    case "IsBorrowed":
      loanStatus = "On Loan"
      break;
    default:
      break;
  }

  return (
    <>
      <Card>
        <CardBody>
          <h3>{ loan?.borrower.displayName }</h3>
          <h4>Status: { loanStatus }</h4>
          <h4>Requested On: { requestDate }</h4>

          <Link to={ '/' }>
            <button className="btn btn-primary" >
              Accept
            </button>
          </Link>
        </CardBody>
      </Card>
    </>
  )
};

export default Loan;