export const between = (number, lowerBound, upperBound) => {
  return number > lowerBound && number < upperBound;
};

export const fetchLevels = async () => {
  const response = await fetch('/levels');
  const levels = await response.json();

  return levels;
};
