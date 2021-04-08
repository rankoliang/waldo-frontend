import { Card } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import LoadableImage from '../LoadableImage';
import BeatLoader from 'react-spinners/BeatLoader';
import ButtonLink from '../ButtonLink';

const LevelCard = ({ level: { id, title, image_path } }) => {
  return (
    <Card>
      <Link to={`/levels/${id}`}>
        <LoadableImage
          src={image_path}
          alt={title}
          renderAs={Card.Image}
          renderSpinnerAs={BeatLoader}
          spinner={{ size: 40 }}
        />
      </Link>
      <Card.Header>
        <Card.Header.Title className="is-centered">{title}</Card.Header.Title>
      </Card.Header>
      <Card.Footer>
        <Card.Footer.Item
          renderAs={ButtonLink}
          color="primary"
          to={`/levels/${id}`}
        >
          Play
        </Card.Footer.Item>
        <Card.Footer.Item
          renderAs={ButtonLink}
          to={`/levels/${id}/leaderboard`}
        >
          Leaderboard
        </Card.Footer.Item>
      </Card.Footer>
    </Card>
  );
};

export default LevelCard;
