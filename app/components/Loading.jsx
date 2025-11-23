export const Spinner = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-pink-500 border-t-transparent"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
