import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './SplashTabs.css'

import WelcomePanel from '../welcome-panel/WelcomePanel';
import ReleaseLogDisplay from '../release-log-display/ReleaseLogDisplay';
import TermsOfUseSplash from '../terms-of-use-splash/TermsOfUseSplash';
import TechStackKey from '../tech-stack-key/TeckStackKey';

const SplashTabs = () => {
  return (
    <div className='background-border'>
      <Tabs>
        <TabList>
          <Tab>Welcome!</Tab>
          <Tab>Technical Overview</Tab>
          <Tab>Release Log</Tab>
          <Tab>Terms Of Use</Tab>
        </TabList>

        <TabPanel>
          <WelcomePanel/>
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
          <TermsOfUseSplash/>
        </TabPanel>
      </Tabs>
    </div>

  )
}

export default SplashTabs