const removeDuplicates = (list = []) => {
  const done = [];
  return list.filter((v) => {
    if (done.includes(v)) return false;
    done.push(v);
    return true;
  });
};

module.exports = {
  removeDuplicates,
};
