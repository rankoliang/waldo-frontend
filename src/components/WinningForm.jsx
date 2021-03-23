import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPhase,
  selectTotalMilliseconds,
  gameExited,
} from '../features/game/gameSlice';
import { Modal, Section, Form, Button, Heading } from 'react-bulma-components';

const WinningForm = () => {
  const dispatch = useDispatch();
  const gamePhase = useSelector(selectPhase);
  const winningTime = useSelector(selectTotalMilliseconds);

  const [name, setName] = useState('');

  const handleOnClose = () => {
    dispatch(gameExited());
  };

  const handleNameChange = ({ target: { value } }) => {
    setName(value);
  };

  return (
    <Modal show={gamePhase === 'ended'} onClose={handleOnClose}>
      <Modal.Content>
        <Section style={{ backgroundColor: 'white' }}>
          <Heading>You won in {winningTime / 1000} seconds.</Heading>
          <form>
            <Form.Field>
              <Form.Label htmlFor="display-name">Name</Form.Label>
              <Form.Control>
                <Form.Input
                  id="display-name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
              </Form.Control>
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
