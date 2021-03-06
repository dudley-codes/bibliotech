import React, { useEffect, useState } from "react";
import { getMyLoanReqs, cancelLoanRequest } from "../../modules/loanManager";
import { useParams } from "react-router-dom";

import Loan from "./Loan";
import { Spinner } from "react-bootstrap";

const LoanList = () => {
  const [ loans, setLoans ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const { id } = useParams();

  const fetchLoans = () => {
    return getMyLoanReqs(id).then(b => setLoans(b))
  }

  //cancel loan request
  const cancelRequest = (id) => {
    setIsLoading(true)
    cancelLoanRequest(id).then(() => {
      fetchLoans().then(() => setIsLoading(false))

    })
  }

  // 

  useEffect(() => {
    fetchLoans();
  }, [])

  return (
    <>
      {/* <h3>Book Loans & Requests</h3> */ }
      <div className='container loan-container'>
        <div className='row justify-content-center'>
          {
            isLoading ? <Spinner /> :
              loans.map((loan) => (
                <Loan loan={ loan } fetchLoans={ fetchLoans } key={ loan.id } cancelRequest={ cancelRequest } />
              )) }
        </div>
      </div>
    </>
  )
};

export default LoanList;
