const Search: React.FC = () => {
  return (
    <div className="search">
      <h1 className="heading">Star Wars Searching</h1>
      <form className="search__form" action="search">
        <input className="search__input" type="text" placeholder="enter" />
        <input className="search__btn" type="submit" value="Search" />
      </form>
    </div>
  );
};

export { Search };
