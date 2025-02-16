import './CreateSplashIntro.css'

const paraOne = "You’re here! The start of your creation journey. This is where you set the foundations of your story - the building blocks that make it yours and the starting point for your adventure."
const paraTwo = "You’re going to be asked to choose the protagonist of your story, the hero (or maybe the villain). You’re going to choose the Genre that your tale will take on. The flavour of the storytelling. Will it a Western adventure, a Cyberpunk mystery, or a magical fairytale? It’s up to you! Next choose the Art Style - how do you want your wonderful tale to be brought to life in pictures - do you want your story to pop out of the page with an anime pop, or do you want to get more experimental with the mind of Frida Kahlo?"
const paraThree = "And finally we come to the real spice of the process, where you let your neurons run free and your creative juices flow… your prompt, to put it simply - what you want to happen in your story. 1000 Monkeys AI Engine is designed to take any prompt and turn it into an adventurous tale. Prompts can be adrenaline fueled nail biting foray into surfing the solar winds of a distant star, to the more mundane tasks that make up everyday life - like buying a bag of apples. 1000M’s AI Engine is designed to turn them into an exciting fable."

const WelcomePanel = () => {
  return (
    <div className="create-splash-intro-container">
      <div className="create-splash-intro-title-container">
        Let's Start The Adventure
      </div>
      <div className='create-splash-intro-text'>
        <p>{paraOne}</p>
        <p>{paraTwo}</p>
        <p>{paraThree}</p>
      </div>
    </div>
  )
}

export default WelcomePanel;