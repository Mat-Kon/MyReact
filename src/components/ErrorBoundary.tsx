import { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Error</p>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
