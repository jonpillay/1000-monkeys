import './StoryBookBrowseInfoPanel.css'

import { useAuthContext } from '../../hooks/useAuthContext';

import LoadIntoCreateButton from '../load-into-create-button/LoadIntoCreateButton';

import { useEffect, useState } from 'react';

const StoryBookBrowseInfoPanel = (props) => {

  const authorID = props.authorID
  const bookID = props.bookID
  const currentUser = props.currentUser

  const title = props.title
  const character = props.character
  const genre = props.genre
  const artstyle = props.artstyle
  const AIEngine = props.AIEngine
  return (
    <>
    <div className="storybook-browse-info-panel-container">
      <div className="storybook-browse-info-panel-grid">
        <div className="storybook-browse-title-container">
          {title}
        </div>
        <div className="storybook-browse-info-panel">
            <div className="browse-info-pane-container">
              Character = {character}
            </div>
            <div className="browse-info-pane-container">
              {authorID == currentUser ? (
                <LoadIntoCreateButton storyID={bookID} />
              ) : (
                <div className="browse-info-pane-container"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default StoryBookBrowseInfoPanel