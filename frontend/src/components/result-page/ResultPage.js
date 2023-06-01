import Image from '../image/image';
import Story from '../story/Story';

const ResultPage = () => {
  return (
    <div className="result-page">
      <h1>Here's your story!</h1>
      <div className="container">
        <Image />
        <Story />
      </div>
    </div>
  );
}

export default ResultPage;
