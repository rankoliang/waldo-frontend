import path from 'path';

export const between = (number, lowerBound, upperBound) => {
  return number > lowerBound && number < upperBound;
};

const createApiFetch = (getPath, messages = {}) => {
  return async (...args) => {
    const response = await fetch(path.join('api/v1/', getPath(...args)));

    if (response.ok) {
      return await response.json();
    } else {
      return rejectResponse(response, messages);
    }
  };
};

const rejectResponse = async (response, messages = {}) => {
  const data = await response.json();
  const { status } = data;

  let message;

  if (messages[status]) {
    message = messages[status];
  } else {
    message = data.error;
  }

  return Promise.reject({ status, message });
};

export const fetchLevels = createApiFetch(() => 'levels', {
  404: 'No levels were found.',
});

export const fetchLevelCharacters = createApiFetch(
  (level) => `levels/${level.id}/characters`
);
