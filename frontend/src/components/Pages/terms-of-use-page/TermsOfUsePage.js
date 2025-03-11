import './TermsOfUsePage.css'

import { useState } from 'react';

const TermsOfUsePage = () => {

  return (
    <div className="terms-of-use-container">
      <div className="terms-of-use-title-container">
        Terms Of Use/Disclaimer
      </div>
      <div className='terms-of-use-text'>
        <div className='terms-of-use-scroll'>
          <span className='tou-subheading'>Non-Commercial Use Only</span>
          <p>This app is designed solely for <b>educational, experimental, and personal portfolio purposes</b>. It is <b>not intended for commercial use or distribution</b>. Any stories, illustrations, or other content generated using this app are to be used <b>solely for demonstration</b>.</p>
          <span className='tou-subheading'>Copyright and Intellectual Property</span>
          <p id='tou-multi-para'>This app may utilize characters, names, and other intellectual properties that are protected by copyright law. These elements are used in a transformative manner for the purpose of experimentation, creativity, and demonstration. All <b>generated content is not for resale or commercial exploitation</b>.</p>
          <p>By using this app, you acknowledge that any use of copyrighted characters is purely non-commercial and for personal and educational purposes only. We <b>do not claim ownership</b> of any copyrighted characters or materials, and <b>users are responsible for ensuring that their usage complies with all applicable copyright laws</b>.</p>
          <span className='tou-subheading'>User Responsibility</span>
          <p><b>You are solely responsible for the content you input into the app</b>. We strongly encourage you to take all steps to avoid submitting/creating any content that may cause offence or infringes on the rights of others. <b>The creators of this app are not liable for any legal issues arising from user-generated content</b>.</p>
          <span className='tou-subheading'>No Endorsement or Affiliation</span>
          <p>This app is not affiliated with, endorsed by, or sponsored by any companies, creators, or rights holders of the copyrighted characters used in the content generation. All character names, trademarks, and other intellectual properties belong to their respective owners.</p>
          <span className='tou-subheading'>Community Guidelines and Content Generation</span>
          <p>We have put into place safeguards around the type of content that can be created on 1000 Monkeys. The <b>creation of content with themes of a sex/drugs/exploitation are strictly prohibited</b> and against our terms of use. We have instigated several checks in an attempt to block the creation of sensitive material - material that goes against these terms of use will be removed and users will have their privileges revoked.</p>
          <p id='tou-multi-para'>By using this app, you agree to abide by the terms of use and accept full responsibility for how you use the generated content.</p>
        </div>
      </div>
    </div>
  )
}

export default TermsOfUsePage;