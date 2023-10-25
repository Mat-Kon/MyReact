import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from './ErrorPage';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError = (error: Error): State => {
    console.log(error);
    return { hasError: true };
  };

  componentDidCatch = (error: Error, errorInfo: ErrorInfo): void => {
    console.log(error, errorInfo);
  };

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
