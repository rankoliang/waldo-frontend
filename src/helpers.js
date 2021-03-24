import path from 'path';

export const between = (number, lowerBound, upperBound) => {
  return number > lowerBound && number < upperBound;
};

const createApiFetch = ({
  getPath,
  messages = {},
  expectResponse = true,
  returnJsonOnError = false,
  opts,
}) => {
  return async (...args) => {
    const response = await fetch(path.join('/api/v1/', getPath(...args)), opts);

    if (response.ok) {
      if (expectResponse) {
        return response.json();
      }
    } else {
      return rejectResponse(response, messages, returnJsonOnError);
    }
  };
};

export class ResponseError extends Error {
  constructor(response) {
    super(response.statusText);
    this.code = `${response.status} Status`;
  }
}

const rejectResponse = async (response, messages = {}, returnJsonOnError) => {
  if (returnJsonOnError) {
    return Promise.reject(await response.json());
  }

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
  getPath: (levelId, page = 1) =>
    `/levels/${levelId}/leaderboard?` + new URLSearchParams({ page }),
});

export const postToLeaderboard = createApiFetch({
  getPath: ({ levelId, name, milliseconds }) =>
    `/levels/${levelId}/leaderboard?` +
    new URLSearchParams({ name, milliseconds }),
  opts: {
    method: 'POST',
    mode: 'no-cors',
  },
  expectResponse: false,
  returnJsonOnError: true,
});
