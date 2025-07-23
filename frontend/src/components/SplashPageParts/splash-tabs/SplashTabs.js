import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './SplashTabs.css'

import WelcomePanel from '../welcome-panel/WelcomePanel';
import ReleaseLogDisplay from '../release-log-display/ReleaseLogDisplay';
import TermsOfUseSplash from '../terms-of-use-splash/TermsOfUseSplash';
import TechStackKey from '../tech-stack-key/TeckStackKey';
import IntroVideoPage from '../IntroVideoPage/IntroVideoPage';
import MeetTheDev from '../meet-the-dev/MeetTheDev';

const SplashTabs = () => {
  return (
    <div className='background-border'>
      <Tabs>
        <TabList>
          <Tab>Welcome!</Tab>
          <Tab>Intro Videos</Tab>
          <Tab>Tech Stack</Tab>
          <Tab>Release Log</Tab>
          <Tab>Meet The Dev</Tab>
          <Tab>Terms Of Use</Tab>
        </TabList>

        <TabPanel>
          <WelcomePanel/>
        </TabPanel>
        <TabPanel>
          <IntroVideoPage/>
        </TabPanel>
        <TabPanel>
          <div className='tech-overview-subheading'>
            Tech Stack:
          </div>
          <TechStackKey/>
          <div className='tech-overview-holder'>
            Tech videos incoming.
          </div>
        </TabPanel>
        <TabPanel>
          <ReleaseLogDisplay/>
        </TabPanel>        
        <TabPanel>
          <MeetTheDev/>
        </TabPanel>
        <TabPanel>
          <TermsOfUseSplash/>
        </TabPanel>
      </Tabs>
    </div>

  )
}

export default SplashTabs