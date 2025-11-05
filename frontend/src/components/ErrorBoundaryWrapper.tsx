import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <div className="p-4 text-center text-red-500 bg-zinc-900 rounded-md">
    <p className="font-semibold">Something went wrong 😔</p>
    <p className="text-sm text-zinc-400 mt-1">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="mt-3 bg-emerald-600 px-3 py-1.5 rounded text-white hover:bg-emerald-500"
    >
      Try again
    </button>
  </div>
);

export const ErrorBoundaryWrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    {children}
  </ErrorBoundary>
);
