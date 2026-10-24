import { Component } from "react";
import { CanvasFallback } from "./CanvasFallback";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Caught 3D scene error, displaying fallback:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <CanvasFallback />;
    }
    return this.props.children;
  }
}
