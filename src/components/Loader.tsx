const Loader: React.FC = () => {
  return <h2 className="loader">I searching</h2>;
};

const viewLoader = (): void => {
  const loader = document.querySelector('.loader') as HTMLElement;
  loader.style.display = 'flex';
};

const hiddenLoader = (): void => {
  const loader = document.querySelector('.loader') as HTMLElement;
  loader.style.display = 'none';
};

export { Loader, viewLoader, hiddenLoader };
