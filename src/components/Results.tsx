const resultClasses = Object.freeze({
  RESULT: 'results',
  WRAPPER: 'results__wrapper',
  ITEM: 'result__item',
  NAME: 'item__name',
  VALUE: 'item__value',
});

const Result: React.FC = () => {
  return (
    <div className={resultClasses.RESULT}>
      <div className={resultClasses.WRAPPER}></div>
    </div>
  );
};

export { Result, resultClasses };
