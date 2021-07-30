import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getAllUserLoans, getLoanRequestTo } from "../../modules/loanManager";
import Loan from "./Loan";

import UserLoan from "./UserLoan";

const UserLoanList = () => {
  const [ loans, setLoans ] = useState([]);
  const [ loansTo, setLoansTo ] = useState([]);

  const fetchLoans = () => {
    return getAllUserLoans().then(b => setLoans(b))
  }

  const fetchLoansTo = () => {
    return getLoanRequestTo().then(l => setLoansTo(l))
  }

  useEffect(() => {
    fetchLoans();
  }, [])

  useEffect(() => {
    fetchLoansTo();
  }, [])

  return (
    <>
      <h3>My Loans & Requests</h3>
      <div className='container'>
        <div className='row justify-content-center'>
          <Card>
            <Card.Body>
              { loans.map((loan) => (
                <UserLoan loan={ loan } fetchLoans={ fetchLoans } key={ loan.id } />
              )) }
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              { loansTo.map((loan) => (
                <Loan loan={ loan } fetchLoans={ fetchLoansTo } key={ loan.id } />
              )) }
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
};

export default UserLoanList;
