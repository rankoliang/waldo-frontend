import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  tokenSet,
  selectPhase,
  selectToken,
  selectDuration,
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
  const duration = useSelector(selectDuration);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

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
      token,
    })
      .then(({ position }) => {
        history.push({
          pathname: location.pathname + '/leaderboard',
          search: `?position=${position}`,
        });
      })
      .catch(({ errors }) => {
        setErrors(errors);
      })
      .finally(() => {
        dispatch(tokenSet({ token: null }));
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
            You finished the level in {(duration / 1000).toFixed(2)} seconds!
          </Heading>
          {errors?.token && (
            <Form.Help color="danger">{errors?.token}</Form.Help>
          )}
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
              {errors?.name &&
                errors?.name.map((err) => (
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
