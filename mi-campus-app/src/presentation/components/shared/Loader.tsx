export const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 border-0 z-50 transition-opacity opacity-50">
      <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export const ChatLoader = () => (
  <div className="flex justify-start mb-3">
    <div className="bg-gray-200 px-4 py-2 rounded-r-2xl rounded-tl-2xl">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  </div>
);
