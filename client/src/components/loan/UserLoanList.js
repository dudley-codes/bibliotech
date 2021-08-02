import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getAllUserLoans, getLoanRequestTo, cancelLoanRequest } from "../../modules/loanManager";
import Loan from "./Loan";

import UserLoan from "./UserLoan";

const UserLoanList = () => {
  const [ loans, setLoans ] = useState([]);
  const [ loansTo, setLoansTo ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const fetchLoans = () => {
    return getAllUserLoans().then(b => setLoans(b))
  }

  const fetchLoansTo = () => {
    return getLoanRequestTo().then(l => setLoansTo(l))
  }

  //cancel loan request
  const cancelRequest = (id) => {
    setIsLoading(true);
    cancelLoanRequest(id).then(() => setTimeout(function () { fetchLoans() }, 300))
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
        <div className="container requests">
          <div className='loan-list__title'>My Loan Requests</div>
          { loans.map((loan) => (
            <UserLoan loan={ loan } fetchLoans={ fetchLoans } key={ loan.id } cancelRequest={ cancelRequest } setLoans={ setLoans } />
          )) }
        </div>
        <div className="container requests">
          <div className='loan-list__title'>Requests for My Books</div>
          { loansTo.map((loan) => (
            <Loan loan={ loan } fetchLoans={ fetchLoansTo } key={ loan.id } />
          )) }
        </div>
      </div>
    </>
  )
};

export default UserLoanList;
