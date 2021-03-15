export const between = (number, lowerBound, upperBound) => {
  return number > lowerBound && number < upperBound;
};

export const fetchLevels = async () => {
  const response = await fetch('/api/v1/levels');

  if (response.ok) {
    const levels = await response.json();

    return levels;
  } else {
    const data = await response.json();
    const { status } = data;

    let message;

    switch (status) {
      case 404:
        message = 'No levels were found.';
        break;
      default:
        message = data.error;
    }

    return Promise.reject({ status, message });
  }
};
