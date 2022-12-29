// @ts-nocheck
import { Button } from '@material-ui/core';
import Image from 'next/image';
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    const defaultProfile = async () => {
      const defaultUsername = 'hesbon-osoro';
      const res = await fetch(
        `https://api.github.com/users/${defaultUsername}`
      );

      const data = await res.json();
      localStorage.setItem('username', JSON.stringify(defaultUsername));
      localStorage.setItem('profile', JSON.stringify(data));
    };

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary">
          <Image src="/fffb.png" width={50} height={50} alt="" />
          <h1>Something went wrong.</h1>
          <p>Use a valid GitHub username</p>
          <Button
            onClick={() => {
              defaultProfile();
              window.location.reload();
            }}
          >
            Refresh
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
