import './WelcomePanel.css'

const WelcomePanel = () => {
  return (
    <div className='welcome-panel-container'>
      <div className="welcome-panel-grid">
        <div className="welcome-title-container">
          Welcome! App/Development History
        </div>
        <div className='welcome-text-container'>
          <div className='welcome-text'>
          Welcome to 1000 Monkeys! An interactive experiment into the ‘Infinite Monkey Theorem’ - an exploration of the idea that if enough monkeys, with enough typewriters, typed enough words, they would eventually stumble upon a masterpiece. The theorem’s logical backbone being that the intersection of chaos and time would eventually align to create something spectacular. A technological interpretation of this in the contemporary context is experimentation with AI - given enough GPT and Stable Diffusion (through Dream Studio) API calls, with enough material generated, and with enough user reviews, can a story that we could call something approaching spectacular be not only created, but also sorted from the chaff.
          <p/>
          1000M started life as a final project for the Makers Bootcamp, a two week sprint working to the team principles of AGILE; it was a product of the learning and interaction of 7 aspiring software developers. In this original incarnation, it was a barebones MVP, this was due to both its incredibly short development cycle (also a learning experience), but also because at the time generative AI was very much in its infancy. Working with the first generations of both GPT and Stable Diffusion, API calls were slow, expensive, and of varying quality - both have since matured. The most enabling technological leap has been the introduction Stable Diffusion 3.5, which has shown great leaps in prompt comprehension and adherence, allowing the 1000M AI engine to be able to create images with accuracy (varying) to the generated chapter.
          </div>
        </div>
      </div>
    </div>
  )


}

export default WelcomePanel;