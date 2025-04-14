import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './SplashTabs.css'

import WelcomePanel from '../welcome-panel/WelcomePanel';
import ReleaseLogDisplay from '../release-log-display/ReleaseLogDisplay';

const SplashTabs = () => {
  return (
    <div className='background-border'>
      <Tabs>
        <TabList>
          <Tab>Welcome!</Tab>
          <Tab>Technical Videos</Tab>
          <Tab>Release Log</Tab>
        </TabList>

        <TabPanel>
          <WelcomePanel/>
        </TabPanel>
        <TabPanel>
          Videos
        </TabPanel>
        <TabPanel>
          <ReleaseLogDisplay/>
        </TabPanel>
      </Tabs>
    </div>

  )
}

export default SplashTabs