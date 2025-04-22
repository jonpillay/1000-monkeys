import './WelcomePanel.css'

import { welcomePara1, welcomePara2, welcomePara3 } from './welcome-panel-text';

const WelcomePanel = () => {
  return (
    <div className='welcome-panel-container'>
      <div className="welcome-panel-grid">
        <div className="welcome-title-container">
          Welcome! App/Development History
        </div>
        <div className='welcome-text-container'>
          <div className='welcome-text-para'>{welcomePara1}</div>
          <div className='welcome-text-para'>{welcomePara2}</div>
          <div className='welcome-text-para'>{welcomePara3}</div>
        </div>
      </div>
    </div>
  )


}

export default WelcomePanel;