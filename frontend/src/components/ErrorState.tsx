interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Канбан Доска
        </h1>
        
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-sm">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Ошибка загрузки данных
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              {message}
            </p>
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
