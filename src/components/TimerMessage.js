import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectStartTime,
  selectTotalMilliseconds,
} from '../features/game/gameSlice';

const TimerMessage = () => {
  const startTime = useSelector(selectStartTime);
  const totalMilliseconds = useSelector(selectTotalMilliseconds);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!totalMilliseconds) {
      setTimeout(() => {
        setTimeElapsed(Math.round((new Date() - startTime) / 1000));
      }, 1000);
    } else {
      setTimeElapsed(totalMilliseconds / 1000);
    }
  }, [totalMilliseconds, timeElapsed, startTime]);

  if (totalMilliseconds) {
    return `You won in ${timeElapsed} s!`;
  } else {
    return `${timeElapsed} s`;
  }
};

export default TimerMessage;
