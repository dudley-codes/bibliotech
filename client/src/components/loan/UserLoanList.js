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
      {/* <h3>My Loans & Requests</h3> */ }
      <div className='container loan-container'>
        <div className="container">
          <div>Your Loan Requests</div>
          { loans.map((loan) => (
            <UserLoan loan={ loan } fetchLoans={ fetchLoans } key={ loan.id } setLoans={ setLoans } />
          )) }
        </div>
        <div className="container">
          <div>Requests for Your Books</div>
          { loansTo.map((loan) => (
            <Loan loan={ loan } fetchLoans={ fetchLoansTo } key={ loan.id } />
          )) }
        </div>
      </div>
    </>
  )
};

export default UserLoanList;
