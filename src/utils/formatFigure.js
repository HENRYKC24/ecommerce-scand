const formatFigure = (figure) => {
  const stringifiedNum = figure.toFixed(2);
  const [whole, decimal] = stringifiedNum.split('.');
  const result = `${Number(whole).toLocaleString()}.${decimal}`;
  return result;
};

export default formatFigure;
