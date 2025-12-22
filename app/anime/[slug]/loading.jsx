// File: app/loading.jsx

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-2 border-gray-300 border-t-red-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-gray-400">Loading...</span>
        </div>
      </div>
    </div>
  );
}
