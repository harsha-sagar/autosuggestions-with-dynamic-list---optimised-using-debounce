const debounce = (fn, timeout) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    setTimeout(fn, timeout);
  };
};

export default debounce;
