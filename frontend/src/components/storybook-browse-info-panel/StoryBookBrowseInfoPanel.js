import './StoryBookBrowseInfoPanel.css'

import { useAuthContext } from '../../hooks/useAuthContext';

import LoadIntoCreateButton from '../load-into-create-button/LoadIntoCreateButton';

import { useEffect, useState } from 'react';

const StoryBookBrowseInfoPanel = (props) => {

  const authorID = props.authorID
  const bookID = props.bookID
  const currentUser = props.currentUser

  console.log("UserPanel rerendered")

  const {user} = useAuthContext()

  return (
    <>
    <div className="storybook-browse-info-panel-container">
      {authorID == currentUser ? (
        <LoadIntoCreateButton storyID={bookID} />
      ) : (
        <div className="buff"></div>
      )}
    </div>
    </>

  )
}

export default StoryBookBrowseInfoPanel