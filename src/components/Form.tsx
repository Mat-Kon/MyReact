import { ChangeEvent, Component, FormEvent, ReactNode } from 'react';

type Props = {
  handlerSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

class Form extends Component<Props, { value: string }> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = { value: '' };
  }

  componentDidMount() {
    const localStorageValue = localStorage.getItem('searchValue');
    if (localStorageValue) this.setState({ value: localStorageValue });
  }

  handlerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    this.setState({ value: value });
  };

  saveValueInStorage = () => {
    const { value } = this.state;
    localStorage.setItem('searchValue', value);
  };

  render(): ReactNode {
    const { value } = this.state;
    const { handlerSubmitForm, isLoading } = this.props;
    return (
      <form className="search__form" action="search" onSubmit={handlerSubmitForm}>
        <input
          className="search__input"
          type="text"
          value={value}
          onChange={this.handlerInputChange}
          disabled={isLoading}
        />
        <button className="search__btn" onClick={this.saveValueInStorage} disabled={isLoading}>
          Search
        </button>
      </form>
    );
  }
}

export default Form;
