import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Button } from 'react-bulma-components';
import {
  selectStartTime,
  selectTotalMilliseconds,
  selectPhase,
} from '../features/game/gameSlice';

const TimerMessage = ({ setModalShow }) => {
  const startTime = useSelector(selectStartTime);
  const totalMilliseconds = useSelector(selectTotalMilliseconds);
  const gamePhase = useSelector(selectPhase);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!totalMilliseconds) {
      const timer = setTimeout(() => {
        setTimeElapsed(Math.round((new Date() - startTime) / 1000));
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setTimeElapsed(totalMilliseconds / 1000);
    }
  }, [totalMilliseconds, timeElapsed, startTime]);

  if (gamePhase === 'ended') {
    return (
      <Navbar.Item
        onClick={() => {
          setModalShow(true);
        }}
        textColor="primary"
        active
      >
        Submit Time of {Math.ceil(timeElapsed)} s
      </Navbar.Item>
    );
  } else {
    return <Navbar.Item renderAs="div">{timeElapsed} s</Navbar.Item>;
  }
};

export default TimerMessage;
