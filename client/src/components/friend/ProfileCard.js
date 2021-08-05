import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

const ProfileCard = ({ user, friend, handleFriend }) => {


  return (
    <Card className='profile-card'>
      <Card.Body>
        <div className='profile-pic__container'>
          <img src={ user.imageUrl } alt='user profile' className='profile-pic' />
        </div>
        <div>{ user?.fullName } </div>
        <div>{ user?.city }, { user.state }</div>
      </Card.Body>
      <Card.Footer>
        {
          friend ?
            <Button onClick={ () => handleFriend(user.id) } variant='cancel'>Unfriend</Button>
            :
            <Button variant='search' onClick={ () => handleFriend(user?.id) }>Add Friend</Button>
        }
      </Card.Footer>
    </Card>
  )
}

export default ProfileCard;