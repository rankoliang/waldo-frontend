import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectPhase,
  selectTotalMilliseconds,
} from '../features/game/gameSlice';
import { Modal, Section, Form, Button, Heading } from 'react-bulma-components';
import { postToLeaderboard } from '../helpers';
import { useParams, useHistory, useLocation } from 'react-router-dom';

const WinningForm = ({ show = false, setModalShow }) => {
  const history = useHistory();
  const location = useLocation();
  const { levelId } = useParams();
  const [errors, setErrors] = useState({});
  const gamePhase = useSelector(selectPhase);
  const totalMilliseconds = useSelector(selectTotalMilliseconds);

  const [name, setName] = useState('Anonymous');

  const handleOnClose = () => {
    setModalShow(false);
  };

  const handleNameChange = ({ target: { value } }) => {
    setName(value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    postToLeaderboard({
      levelId,
      name,
      milliseconds: totalMilliseconds,
    })
      .then(({ position }) => {
        history.push({
          pathname: location.pathname + '/leaderboard',
          search: `?position=${position}`,
        });
      })
      .catch(({ errors }) => {
        setErrors(errors);
      });
  };

  return (
    <Modal
      closeOnBlur={true}
      show={show && gamePhase === 'ended'}
      onClose={handleOnClose}
    >
      <Modal.Content>
        <Section style={{ backgroundColor: 'white' }}>
          <Heading>
            You won in {(totalMilliseconds / 1000).toFixed(2)} seconds.
          </Heading>
          <form onSubmit={handleOnSubmit}>
            <Form.Field>
              <Form.Label htmlFor="display-name">Name</Form.Label>
              <Form.Control>
                <Form.Input
                  id="display-name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  maxLength="20"
                  minLength="3"
                  required
                />
              </Form.Control>
              {errors.name &&
                errors.name.map((err) => (
                  <Form.Help color="danger">Name {err}</Form.Help>
                ))}
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Button color="info">Submit to leaderboard</Button>
              </Form.Control>
            </Form.Field>
          </form>
        </Section>
      </Modal.Content>
    </Modal>
  );
};

export default WinningForm;
