import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useParams, useHistory } from 'react-router-dom'
import { addLoan } from '../../modules/loanManager'
import { getBookById } from '../../modules/bookManager';


const BookRequest = () => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ show, setShow ] = useState(false)
  const [ loan, setLoan ] = useState({})
  const [ book, setBook ] = useState({})
  const { id } = useParams();
  const history = useHistory();

  // When called, closes the Modal
  const handleClose = () => {
    setShow(false)
  };

  const fetchBook = () => {
    getBookById(id).then(b => setBook(b));
  }

  useEffect(() => {
    fetchBook()
  }, [])

  // Executes the modal
  const handleShow = () => setShow(true);

  // Sets the entry to be edited
  const handleControlledInputChange = (e) => {
    const newLoan = { ...loan };
    let selectedVal = e.target.value;
    newLoan.dueDateUnix = Date.parse(selectedVal) / 1000;
    newLoan.bookId = parseInt(id);
    newLoan.ownerId = book.ownerId;
    setLoan(newLoan)
  }

  // Writes the updated entry to the JSON server and then fetches the updated entry to update the DOM
  const updateExistingEntry = (e) => {
    e.preventDefault()
    setIsLoading(true)

    handleClose();
    addLoan(loan)
      .then(() => handleClose())
  }

  return (
    <>
      <Button onClick={ handleShow }>
        Request Loan
      </Button>


      <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Submit Loan Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <fieldset>
              <div className='habit-form__group'>
                <label htmlFor='returnDate'>Return Date:</label>
                <input
                  type='date'
                  required
                  id='returnDate'
                  onChange={ handleControlledInputChange }
                  autoFocus
                  className='form-control'
                  defaultValue={ loan.date }
                />
              </div>
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className='button-container'>
            <div className='button-container__save'>
              <Button
                variant="secondary"
                onClick={ handleClose }>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={ updateExistingEntry }
                disabled={ isLoading }
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BookRequest;