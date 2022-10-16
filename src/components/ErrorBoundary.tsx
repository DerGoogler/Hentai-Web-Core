import React from "react";
import { ErrorInfo, ReactNode } from "react";
import { Page, Toolbar } from "react-onsenui";

interface Props {
  children: ReactNode;
}

interface States {
  hasError: boolean;
  error: Error | string | null;
  errorInfo: ErrorInfo | string | null;
}

class ErrorBoundary extends React.Component<Props, States> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }

  public render(): JSX.Element {
    const { hasError, errorInfo, error } = this.state;

    if (hasError) {
      return (
        <Page
          renderToolbar={() => (
            <Toolbar>
              <div className="center">Something went wrong</div>
            </Toolbar>
          )}
        >
          <p>{(errorInfo as ErrorInfo).componentStack}</p>
        </Page>
      );
    }
    return this.props.children as any;
  }
}

export default ErrorBoundary;
