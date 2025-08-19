const NewsSkeleton = () => (
  <div className="py-24 w-[90%] mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-card p-6 rounded-xl shadow-md w-full max-w-sm animate-pulse"
        >
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-600 rounded mb-3"></div>
          <div className="h-16 bg-gray-300 rounded mb-6"></div>
          <div className="h-4 bg-primary rounded w-20"></div>
        </div>
      ))}
    </div>
  </div>
);
