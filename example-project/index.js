exports.createCave = () => {
  const echo = (noise) => {
    return noise + " but quieter";
  };

  return {
    echo,
  }
};