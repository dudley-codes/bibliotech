import React, { useEffect, useState } from "react";
import { addFriend, getAllFriends, getNotFriends, unFriend } from "../../modules/friendManager";
import ProfileCard from "./ProfileCard";

const FriendsList = () => {
  const [ friends, setFriends ] = useState([]);
  const [ notFriends, setNotFriends ] = useState([]);

  const fetchFriends = () => {
    getAllFriends().then(res => setFriends(res))
  }

  useEffect(() => {
    fetchFriends()
  }, [])

  const fetchNotFriends = () => {
    getNotFriends().then(res => setNotFriends(res))
  }

  useEffect(() => {
    fetchNotFriends()
  }, [])

  const handleUnfriend = (id) => {
    unFriend(id).then(() => {
      fetchFriends()
      fetchNotFriends()
    })
  }

  const handleAddFriend = (id) => {
    addFriend(id).then(() => {
      fetchFriends()
      fetchNotFriends()
    })
  }
  return (
    <>
      <div className='container'>
        <div className='friends'>
          <div>Friends</div>
          {
            friends.map((user) => (
              <ProfileCard user={ user } key={ user.id } friend={ true } handleFriend={ handleUnfriend } />
            ))
          }
        </div>
        <div className='not-friends'>
          <div>Not Friends</div>
          {
            notFriends.map((user) => (
              <ProfileCard user={ user } key={ user.id } friend={ false } handleFriend={ handleAddFriend } />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default FriendsList;