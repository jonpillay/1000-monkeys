import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './SplashTabs.css'

import WelcomePanel from '../welcome-panel/WelcomePanel';

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
          Release Log
        </TabPanel>
      </Tabs>
    </div>

  )
}

export default SplashTabs