import './StoryBookBrowseInfoPanel.css'

import LoadIntoCreateButton from '../load-into-create-button/LoadIntoCreateButton';
import RatingPanel from '../rating-panel/RatingPanel';

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
  const ratings = props.ratings

  return (
    <>
    <div className="storybook-browse-info-panel-container">
      <div className="storybook-browse-info-panel-grid">
        <div className="rating-container">
          <RatingPanel ratings={ratings} bookID={bookID} authorID={authorID} />
        </div>
        <div className="star-title-container">
          <div className="browse-info-pane-container">
            <div className='starring-genre-span'>
              <span className='starring-container'>{character} </span> In A <span style={{fontFamily:genreFont, paddingLeft:'0.3vw', paddingRight:'0.3vw'}}>{genre}</span> Story by {author}
            </div>
          </div>
          <div className="storybook-browse-title-container">
            {title}
          </div>
        </div>
        <div className="edit-read-container">
          {currentUser && authorID == currentUser.id ? (
              <div className="edit-container">
                <LoadIntoCreateButton storyID={bookID} />
              </div>
              ) : (
                <div className="browse-info-pane-container"></div>
              )}
        </div>
      </div>
    </div>
  </>
  )
}

export default StoryBookBrowseInfoPanel