import React from 'react';

const Logout = (props) => {

  const signOut = (userId) => {
    props.logoutCurrentUser()
    props.setLocalStorage(null)
  }

  return (
    <button onClick={() => signOut(props.currentUser)}>Logout</button>
  );



};

export default Logout;