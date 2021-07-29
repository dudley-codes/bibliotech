import React, { useEffect, useState } from "react";
import { getAllUserLoans } from "../../modules/loanManager";

import UserLoan from "./UserLoan";

const UserLoanList = () => {
  const [ loans, setLoans ] = useState([]);

  const fetchLoans = () => {
    return getAllUserLoans().then(b => setLoans(b))
  }

  useEffect(() => {
    fetchLoans();
  }, [])

  return (
    <>
      <h3>My Loans & Requests</h3>
      <div className='container'>
        <div className='row justify-content-center'>
          { loans.map((loan) => (
            <UserLoan loan={ loan } fetchLoans={ fetchLoans } key={ loan.id } />
          )) }
        </div>
      </div>
    </>
  )
};

export default UserLoanList;
