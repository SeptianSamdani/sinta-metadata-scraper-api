import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import TrendChart from './components/TrendChart';
import KeywordChart from './components/KeywordChart';
import ArticleTable from './components/ArticleTable';
import ExportButton from './components/ExportButton';
import { searchTopic, getDashboardData } from './services/api';
import ArticleDetailModal from './components/ArticleDetailModal';
import ArticleTableSkeleton from './components/ArticleTableSkeleton';


function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleSearch = async (topic) => {
    setLoading(true);
    setError(null);
    setDashboardData(null);
    setCurrentTopic(topic);

    localStorage.setItem("lastTopic", topic); // ← ADDED

    try {
      await searchTopic(topic);
      const data = await getDashboardData(topic);
      setDashboardData(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
}; 

  useEffect(() => {
  const savedTopic = localStorage.getItem("lastTopic");
    if (savedTopic) {
      if (confirm(`Load previous search: "${savedTopic}" ?`)) {
        handleSearch(savedTopic);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Research Intelligence Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {dashboardData && (
          <div className="mt-4 flex justify-end">
            <ExportButton 
              topic={currentTopic} 
              disabled={loading || !dashboardData} 
            />
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-8">
            <ArticleTableSkeleton />
          </div>
        )}

        {dashboardData && (
          <div className="mt-8 space-y-8">
            <TrendChart data={dashboardData.trendData} />
            <KeywordChart data={dashboardData.keywords} />
            <ArticleTable 
              data={dashboardData.articles} 
              onDetail={(a) => setSelectedArticle(a)}
            />

            {selectedArticle && (
              <ArticleDetailModal 
                article={selectedArticle} 
                onClose={() => setSelectedArticle(null)} 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;