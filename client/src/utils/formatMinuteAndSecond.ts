const formatMinuteAndSecond = (timeInMinutes: number) => {
  const minute = Math.floor(timeInMinutes / 60);
  const second = Math.floor(timeInMinutes) % 60;

  return [minute, second];
};

export default formatMinuteAndSecond;
