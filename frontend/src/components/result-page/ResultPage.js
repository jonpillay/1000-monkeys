import Image from '../image/image';
import Story from '../story/Story';

const ResultPage = ({ navigate }) => {
  return (
    <div className="result-page">
      <h1>Here's your story!</h1>
      <div className="container">
        <Image />
        <Story />
        <div className="buttons">
          <button>Save this story</button>
          <button>Make a new story</button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
