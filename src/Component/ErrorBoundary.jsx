import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // Initialize state to track if there's an error
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // Called when an error is thrown in the child components
  static getDerivedStateFromError(error) {
    // Update state to indicate that an error occurred
    return { hasError: true };
  }

  // This method logs the error and information
  componentDidCatch(error, errorInfo) {
    // You can log the error to an external service here
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can customize this fallback UI
      return (
        <div>
          <h2>Something went wrong. Please try again later.</h2>
          {/* You can also display more error details */}
          {/* <details>
            <summary>Click for more details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details> */}
        </div>
      );
    }

    // If no error, render the children components
    return this.props.children;
  }
}

export default ErrorBoundary;
