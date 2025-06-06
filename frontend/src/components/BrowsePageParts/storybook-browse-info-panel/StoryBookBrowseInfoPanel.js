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
  const userRead = props.userRead
  const ratingsAverage = props.ratingsAverage

  return (
    <>
    <div className="storybook-browse-info-panel-container">
      <div className="storybook-browse-info-panel-grid">
        <div className="rating-container">
          <RatingPanel ratings={ratings} bookID={bookID} authorID={authorID} ratingsAverage={ratingsAverage}/>
        </div>
        <div className="star-title-container">
          <div className="browse-info-pane-container">
            <div className='starring-genre-span'>
              <span className='starring-container'>{character} </span> In A <span style={{fontFamily:genreFont, paddingLeft:'0.5rem', paddingRight:'0.5rem'}}>{genre}</span> Story by {author}
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
                <>
                {!currentUser || userRead ? (
                  <div className="browse-info-pane-filler"></div>
                ) : (
                  <div className="new-container">
                    <div className='new-border'>
                      <span className='new-text'>NEW!</span>
                    </div>                  
                  </div>
                )
                }
              </>
              )}
        </div>
      </div>
    </div>
  </>
  )
}

export default StoryBookBrowseInfoPanel