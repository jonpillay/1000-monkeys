import './StoryBookBrowseInfoPanel.css'

import { useAuthContext } from '../../hooks/useAuthContext';

import LoadIntoCreateButton from '../load-into-create-button/LoadIntoCreateButton';

import { useEffect, useState } from 'react';

const StoryBookBrowseInfoPanel = (props) => {

  const authorID = props.authorID
  const bookID = props.bookID
  const currentUser = props.currentUser

  const author = props.author
  const title = props.title
  const character = props.character
  const genre = props.genre
  const artstyle = props.artstyle
  const AIEngine = props.AIEngine
  const genreFont = props.genreFont

  return (
    <>
    <div className="storybook-browse-info-panel-container">
      <div className="storybook-browse-info-panel-grid">
        <div className="info-container-one">
          rating
        </div>
        <div className="star-title-container">
          <div className="browse-info-pane-container">
            <span className='starring-span'>{character} </span> Stars In A <span style={{fontFamily:genreFont}}>{genre}</span> Story by {author}
          </div>
          <div className="storybook-browse-title-container">
            {title}
          </div>
        </div>
        <div className="storybook-browse-info-panel">
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