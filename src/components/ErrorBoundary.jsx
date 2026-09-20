import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled React Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f0e14] text-[#f6f3f8] p-8 flex flex-col items-center justify-center font-mono space-y-4">
          <div className="p-6 rounded-xl bg-[#191724] border border-[#3a3652] max-w-xl w-full space-y-4 shadow-2xl">
            <h2 className="text-xl font-bold text-[#a99bea]">LIFE//ARCHIVE — Application Error</h2>
            <p className="text-xs text-[#a09cab]">
              An unhandled rendering exception occurred:
            </p>
            <pre className="p-3 bg-[#0f0e14] rounded text-xs text-red-400 overflow-x-auto border border-red-900/40">
              {this.state.error && this.state.error.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded bg-[#a99bea] text-[#1c0956] font-bold text-xs uppercase hover:bg-[#c8beff] transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
