import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Star, Calendar, Clock } from 'lucide-react';

import type { Movie, StreamingService } from './types';
import { getMockMovies } from './data/mockData';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const moviesPerPage = 12;

  const searchMovies = async (query: string, page: number = 1) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Try RapidAPI first
      const response = await fetch(
        `https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&series_granularity=show&order_direction=asc&order_by=original_title&genres_relation=and&output_language=en&show_type=movie&keyword=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data && data.shows && data.shows.length > 0) {
          // Sort movies by rating (highest first)
          const sortedMovies = data.shows.sort((a: Movie, b: Movie) => {
            const ratingA = a.rating || 0;
            const ratingB = b.rating || 0;
            return ratingB - ratingA;
          });

          const startIndex = (page - 1) * moviesPerPage;
          const endIndex = startIndex + moviesPerPage;
          const paginatedMovies = sortedMovies.slice(startIndex, endIndex);

          setMovies(paginatedMovies);
          setTotalPages(Math.ceil(sortedMovies.length / moviesPerPage));
          return;
        }
      }

      // Fallback to mock data if API fails
      console.log('API failed, using mock data. Status:', response.status);
      const mockResults = getMockMovies(query);

      if (mockResults.length > 0) {
        // Sort mock results by rating (highest first)
        const sortedMockResults = mockResults.sort((a: Movie, b: Movie) => {
          const ratingA = a.rating || 0;
          const ratingB = b.rating || 0;
          return ratingB - ratingA;
        });

        const startIndex = (page - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        const paginatedMovies = sortedMockResults.slice(startIndex, endIndex);

        setMovies(paginatedMovies);
        setTotalPages(Math.ceil(sortedMockResults.length / moviesPerPage));

        // Show info message about using demo data
        setError('Using demo data - API key may need subscription to Streaming Availability API');
      } else {
        setMovies([]);
        setTotalPages(1);
      }

    } catch (error) {
      console.log('API error, using mock data:', error);
      // Fallback to mock data on any error
      const mockResults = getMockMovies(query);

      if (mockResults.length > 0) {
        // Sort mock results by rating (highest first)
        const sortedMockResults = mockResults.sort((a: Movie, b: Movie) => {
          const ratingA = a.rating || 0;
          const ratingB = b.rating || 0;
          return ratingB - ratingA;
        });

        const startIndex = (page - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        const paginatedMovies = sortedMockResults.slice(startIndex, endIndex);

        setMovies(paginatedMovies);
        setTotalPages(Math.ceil(sortedMockResults.length / moviesPerPage));

        setError('Using demo data - Please check your RapidAPI subscription for Streaming Availability API');
      } else {
        setMovies([]);
        setError('No results found in demo data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    searchMovies(searchQuery, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchMovies(searchQuery, page);
  };

  const getStreamingServices = (movie: Movie): StreamingService[] => {
    return movie.streamingOptions?.us || [];
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Movie Streaming Finder
          </h1>
          <p className="text-gray-400 text-lg">
            Discover where to watch your favorite movies across streaming platforms
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies..."
              className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-md transition-colors cursor-pointer"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-center">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-400">Searching for movies...</p>
          </div>
        )}

        {/* Movies Grid */}
        {!loading && movies.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform"
                >
                  {/* Movie Poster */}
                  <div className="relative aspect-[2/3] bg-gray-700">
                    {movie.imageSet?.verticalPoster?.w480 ? (
                      <img
                        src={movie.imageSet.verticalPoster.w480}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <span>No Image</span>
                      </div>
                    )}

                    {/* Rating Badge */}
                    {movie.rating && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-md text-sm font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {movie.rating.toFixed(1)}
                      </div>
                    )}
                  </div>

                  {/* Movie Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                      {movie.releaseYear && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {movie.releaseYear}
                        </div>
                      )}
                      {movie.runtime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {movie.runtime}m
                        </div>
                      )}
                    </div>

                    {movie.overview && (
                      <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                        {movie.overview}
                      </p>
                    )}

                    {/* Streaming Services */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Available on:</h4>
                      <div className="space-y-1">
                        {getStreamingServices(movie).length > 0 ? (
                          getStreamingServices(movie).slice(0, 3).map((service, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-xs bg-gray-700 px-2 py-1 rounded"
                            >
                              <span className="capitalize">{service.service.name}</span>
                              <span className="text-green-400 capitalize">{service.type}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-500 text-xs">No streaming info available</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 rounded-md transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-md transition-colors ${currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 rounded-md transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Initial State */}
        {!loading && !searchQuery && movies.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Search for movies to get started</p>
            <p className="text-gray-500 mt-2">Find where to watch your favorite films across streaming platforms</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
