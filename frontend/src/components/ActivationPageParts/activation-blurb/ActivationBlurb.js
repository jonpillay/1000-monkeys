import './ActivationBlurb.css'

const ActivationBlurb = () => {
  return (
    <div className="activation-blurb-container">
      <div className="activation-title-container">
        You're At The Sign-Up Desk!
      </div>
      <div>
        <div className='activation-text'>
          <p>
            Hello and welcome to 1000 Monkeys. We’re guessing you found your way here because you received one of the telegrams we sent out. That’s right, you’ve been chosen to be part of an intrepid bunch of adventurers to be the first to explore the interactive storytelling experiment we call 1000M!
          </p>
          <p>
            Before you set off on the expedition, we need you to sign off on some basic paperwork, all simple stuff, no waivers or anything here, our gaggle are generally well behaved. First we need the email address where you received your invite email (or the temporary email address we supplied to you for signup), to go with that we need the invite code we sent you so we can check you are who you say you are - and then you’re at the sign up desk.
          </p>
          <p>
            Here we need your username, the name everyone else is going to call you whilst you’re on your expedition! Be creative with your choices, we’ve already got Multivariate Atwood and S.D. Salinger - choose what author you’re going to be. We’re also going to ask you to give us your secret password - don’t worry, it’s immediately encrypted and stored in our secure backend.
          </p>
          <p>
          And that’s it, you’re ready to set off on your adventure… make sure your password and the email address you used to sign up when you get to the Adventurers’ Check In desk and we get you on your way!
          </p>
        </div>
      </div>
    </div>
  )
}

export default ActivationBlurb;