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

  static getDerivedStateFromError = (): State => {
    return { hasError: true };
  };

  componentDidCatch = (error: Error, errorInfo: ErrorInfo): void => {
    console.log(`This is error: ${error}`);
    console.log(`This is errorInform: ${errorInfo.componentStack}`);
  };

  render(): ReactNode {
    const { hasError } = this.state;
    if (hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;