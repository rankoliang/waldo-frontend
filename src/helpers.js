import path from 'path';

export const between = (number, lowerBound, upperBound) => {
  return number > lowerBound && number < upperBound;
};

const createApiFetch = ({ getPath, messages = {} }) => {
  return async (...args) => {
    const response = await fetch(path.join('/api/v1/', getPath(...args)));

    if (response.ok) {
      return response.json();
    } else {
      return rejectResponse(response, messages);
    }
  };
};

export class ResponseError extends Error {
  constructor(response) {
    super(response.statusText);
    this.code = `${response.status} Status`;
  }
}

const rejectResponse = async (response, messages = {}) => {
  const err = new ResponseError(response);

  try {
    err.message = await getErrorMessage(response, messages);
  } finally {
    return Promise.reject(err);
  }
};

const getErrorMessage = async (response, messages = {}) => {
  const { status } = response;

  if (messages[status]) {
    return messages[status];
  } else {
    return (await response.json()).error;
  }
};

export const fetchLevels = createApiFetch({
  getPath: () => '/levels',
  messages: {
    404: 'No levels were found.',
  },
});

export const fetchLevel = createApiFetch({ getPath: (id) => `/levels/${id}` });

export const fetchLevelCharacters = createApiFetch({
  getPath: (level) => `/levels/${level.id}/characters`,
});

export const fetchFound = createApiFetch({
  getPath: ({ level, character, coords }) =>
    `/levels/${level.id}/characters/${character.id}/search?` +
    new URLSearchParams(coords),
});

export const fetchLeaderboard = createApiFetch({
  getPath: (levelId) => `/levels/${levelId}/leaderboard`,
});
