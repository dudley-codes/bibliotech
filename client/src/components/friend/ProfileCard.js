import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

const ProfileCard = ({ user, friend, handleFriend }) => {


  return (
    <Card>
      <Card.Body>
        <div>{ user.firstName + ' ' + user.lastName } </div>
        <div>{ user.city }, { user.state }</div>
      </Card.Body>
      <Card.Footer>
        {
          friend ?
            <Button onClick={ () => handleFriend(user.id) } variant='danger'>Unfriend</Button>
            :
            <Button onClick={ () => handleFriend(user.id) }>Add Friend</Button>
        }
      </Card.Footer>
    </Card>
  )
}

export default ProfileCard;