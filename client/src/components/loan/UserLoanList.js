import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getAllUserLoans, getLoanRequestTo, cancelLoanRequest, getAllButDeleted } from "../../modules/loanManager";
import Loan from "./Loan";

import UserLoan from "./UserLoan";

const UserLoanList = () => {
  const [ loans, setLoans ] = useState([]);
  const [ loansTo, setLoansTo ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  //fetch loan requests sent by user
  const fetchLoans = () => {
    return getAllUserLoans().then(b => setLoans(b))
  }

  useEffect(() => {
    fetchLoans();
  }, [])
  //fetch all loans but one to be deleted. 
  // SOLVES timing issue where loans were being fetched and set before deletion could happen
  const fetchAllButDeleted = (id) => {
    getAllButDeleted(id).then(l => setLoans(l))
  }

  // Fetch loan requests sent to user
  const fetchLoansTo = () => {
    return getLoanRequestTo().then(l => setLoansTo(l))
  }

  useEffect(() => {
    fetchLoansTo();
  }, [])

  //cancel loan request
  const cancelRequest = (id) => {
    setIsLoading(true);
    cancelLoanRequest(id).then(() => {
      fetchLoans().then(() => setIsLoading(false))
    })
  }

  return (
    <>
      <div className='loan-container'>
        <div className='requests-container'>
          <div className='loan-list__title'>Requests for My Books</div>
          <div className='loan-cards'>
            {
              loansTo?.length === 0 ?
                <>
                  <br />
                  <br />
                  <Card className='no-loans'>
                    <Card.Body>
                      <div>You don't have any requests for your books yet.</div>
                    </Card.Body>
                  </Card>
                </> :
                loansTo.map((loan) => (
                  <Loan loan={ loan } fetchLoans={ fetchLoansTo } key={ loan.id } />
                )) }
          </div>
        </div>
        <div className="requests-container">
          <div className='loan-list__title'>My Loan Requests</div>
          <div className='loan-cards'>
            {
              loans?.length === 0 ?
                <>
                  <br />
                  <br />
                  <Card className='no-loans'>
                    <Card.Body>
                      <div>You haven't made any loan requests yet.</div>
                    </Card.Body>
                  </Card>
                </> :
                loans.map((loan) => (
                  <UserLoan
                    loan={ loan }
                    fetchLoans={ fetchLoans }
                    key={ loan.id }
                    cancelRequest={ cancelRequest }
                    setLoans={ setLoans }
                    fetchAllButDeleted={ fetchAllButDeleted }
                    loans={ loans } />
                )) }
          </div>
        </div>
      </div>
    </>
  )
};

export default UserLoanList;
