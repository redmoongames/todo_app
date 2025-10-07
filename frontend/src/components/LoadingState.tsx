export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Канбан Доска
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((columnIndex) => (
            <div key={columnIndex} className="bg-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
                <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3].map((taskIndex) => (
                  <div key={taskIndex} className="bg-gray-200 rounded-lg p-3 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
