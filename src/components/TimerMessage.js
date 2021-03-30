import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from 'react-bulma-components';
import {
  selectStartTime,
  selectDuration,
  selectPhase,
} from '../features/game/gameSlice';

const TimerMessage = ({ setModalShow }) => {
  const startTime = useSelector(selectStartTime);
  const duration = useSelector(selectDuration);
  const gamePhase = useSelector(selectPhase);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!duration) {
      const timer = setTimeout(() => {
        setTimeElapsed(Math.round((new Date() - startTime) / 1000));
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setTimeElapsed(duration / 1000);
    }
  }, [duration, timeElapsed, startTime]);

  if (gamePhase === 'ended') {
    return (
      <Navbar.Item
        onClick={() => {
          setModalShow(true);
        }}
        textColor="primary"
      >
        Submit Time of {Math.ceil(timeElapsed)} s
      </Navbar.Item>
    );
  } else {
    return <Navbar.Item renderAs="div">{timeElapsed} s</Navbar.Item>;
  }
};

export default TimerMessage;
