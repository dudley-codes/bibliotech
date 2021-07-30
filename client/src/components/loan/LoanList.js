import React, { useEffect, useState } from "react";
import { getMyLoanReqs } from "../../modules/loanManager";
import { useParams } from "react-router-dom";

import Loan from "./Loan";

const LoanList = () => {
  const [ loans, setLoans ] = useState([]);
  const { id } = useParams();

  const fetchLoans = () => {
    return getMyLoanReqs(id).then(b => setLoans(b))
  }

  useEffect(() => {
    setTimeout(function () { fetchLoans(); }, 600);
  }, [])

  return (
    <>
      <h3>Book Loans & Requests</h3>
      <div className='container'>
        <div className='row justify-content-center'>
          { loans.map((loan) => (
            <Loan loan={ loan } fetchLoans={ fetchLoans } key={ loan.id } />
          )) }
        </div>
      </div>
    </>
  )
};

export default LoanList;
