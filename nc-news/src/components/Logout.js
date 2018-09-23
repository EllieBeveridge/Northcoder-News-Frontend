import React from 'react';
import PropTypes from 'prop-types'

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

Logout.propTypes = {
  logoutCurrentUser: PropTypes.func,
  setLocalStorage: PropTypes.func,
  currentUser: PropTypes.object
}