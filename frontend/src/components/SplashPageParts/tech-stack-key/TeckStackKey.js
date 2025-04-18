import './TeckStackKey.css'

import './tech-stack-text.js'

import reactLogo from '../../../img/tech-badges/react-badge.svg'
import mongoLogo from '../../../img/tech-badges/mongo-badge.svg'
import expressLogo from '../../../img/tech-badges/express-badge.svg'
import nodeLogo from '../../../img/tech-badges/node-badge.svg'
import AiEngineLogo from '../../../img/favpng_infinite-monkey-theorem2.png'
import { AiEngineTitle, AiEngineText, ReactTitle, ReactText, MongoTitle, MongoText, ExpressTitle, ExpressText, NodeTitle, NodeText, NotableTitle, NotableText1, NotableText2 } from './tech-stack-text.js'

const TechStackKey = () => {

  return (
    <div className='tech-stack-key-container'>
      <div className='stack-component-container'>
        <div className='stack-component-header-container'>
          <div className='stack-component-logo-container'>
            <img className='tech-badge' id='AiEngineBadge' src={AiEngineLogo}/>
          </div>
          <div className='stack-component-title-container'>
            {AiEngineTitle}
          </div>
        </div>
        <div className='stack-component-text-container'>
          {AiEngineText}
        </div>
      </div>
      <div className='stack-component-container'>
        <div className='stack-component-header-container'>
          <div className='stack-component-logo-container'>
            <img className='tech-badge' src={mongoLogo}/>
          </div>
          <div className='stack-component-title-container'>
            {MongoTitle}
          </div>
        </div>
        <div className='stack-component-text-container'>
          {MongoText}
        </div>
      </div>      
      <div className='stack-component-container'>
        <div className='stack-component-header-container'>
          <div className='stack-component-logo-container'>
            <img className='tech-badge' src={expressLogo}/>
          </div>
          <div className='stack-component-title-container'>
            {ExpressTitle}
          </div>
        </div>
        <div className='stack-component-text-container'>
          {ExpressText}
        </div>
      </div>    
      <div className='stack-component-container'>
        <div className='stack-component-header-container'>
          <div className='stack-component-logo-container'>
            <img className='tech-badge' src={reactLogo}/>
          </div>
          <div className='stack-component-title-container'>
            {ReactTitle}
          </div>
        </div>
        <div className='stack-component-text-container'>
          {ReactText}
        </div>
      </div>
      <div className='stack-component-container'>
        <div className='stack-component-header-container'>
          <div className='stack-component-logo-container'>
            <img className='tech-badge' src={nodeLogo}/>
          </div>
          <div className='stack-component-title-container'>
            {NodeTitle}
          </div>
        </div>
        <div className='stack-component-text-container'>
          {NodeText}
        </div>
      </div>
      <div className='stack-component-container'>
        <div className='stack-component-header-container'>
          <div className='stack-component-title-container' id='notable-mentions'>
            {NotableTitle}
          </div>
        </div>
        <div className='stack-component-text-container'>
          {NotableText1}
        </div>        
        <div className='stack-component-text-container'>
          {NotableText2}
        </div>
      </div>
    </div>
  )

}

export default TechStackKey