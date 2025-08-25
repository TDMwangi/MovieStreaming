import type { Movie } from '../types';

export const getMockMovies = (query: string): Movie[] => {
  const mockMovies: Movie[] = [
    {
      id: '1',
      title: 'Avengers: Endgame',
      overview: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
      releaseYear: 2019,
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Adventure' },
        { id: 3, name: 'Drama' }
      ],
      rating: 8.4,
      runtime: 181,
      imageSet: {
        verticalPoster: {
          w240: 'https://image.tmdb.org/t/p/w240/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
          w360: 'https://image.tmdb.org/t/p/w360/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
          w480: 'https://image.tmdb.org/t/p/w480/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
          w600: 'https://image.tmdb.org/t/p/w600/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
          w720: 'https://image.tmdb.org/t/p/w720/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
        }
      },
      streamingOptions: {
        us: [
          {
            service: { id: 'disney', name: 'Disney+' },
            type: 'subscription',
            link: 'https://disneyplus.com'
          },
          {
            service: { id: 'prime', name: 'Amazon Prime' },
            type: 'rent',
            link: 'https://amazon.com'
          }
        ]
      }
    },
    {
      id: '2',
      title: 'The Dark Knight',
      overview: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.',
      releaseYear: 2008,
      genres: [
        { id: 1, name: 'Action' },
        { id: 4, name: 'Crime' },
        { id: 3, name: 'Drama' }
      ],
      rating: 9.0,
      runtime: 152,
      imageSet: {
        verticalPoster: {
          w240: 'https://image.tmdb.org/t/p/w240/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
          w360: 'https://image.tmdb.org/t/p/w360/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
          w480: 'https://image.tmdb.org/t/p/w480/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
          w600: 'https://image.tmdb.org/t/p/w600/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
          w720: 'https://image.tmdb.org/t/p/w720/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
        }
      },
      streamingOptions: {
        us: [
          {
            service: { id: 'hbo', name: 'HBO Max' },
            type: 'subscription',
            link: 'https://hbomax.com'
          },
          {
            service: { id: 'prime', name: 'Amazon Prime' },
            type: 'rent',
            link: 'https://amazon.com'
          }
        ]
      }
    },
    {
      id: '3',
      title: 'Inception',
      overview: 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state.',
      releaseYear: 2010,
      genres: [
        { id: 1, name: 'Action' },
        { id: 5, name: 'Sci-Fi' },
        { id: 6, name: 'Thriller' }
      ],
      rating: 8.8,
      runtime: 148,
      imageSet: {
        verticalPoster: {
          w240: 'https://image.tmdb.org/t/p/w240/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
          w360: 'https://image.tmdb.org/t/p/w360/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
          w480: 'https://image.tmdb.org/t/p/w480/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
          w600: 'https://image.tmdb.org/t/p/w600/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
          w720: 'https://image.tmdb.org/t/p/w720/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'
        }
      },
      streamingOptions: {
        us: [
          {
            service: { id: 'netflix', name: 'Netflix' },
            type: 'subscription',
            link: 'https://netflix.com'
          },
          {
            service: { id: 'prime', name: 'Amazon Prime' },
            type: 'rent',
            link: 'https://amazon.com'
          }
        ]
      }
    },
    {
      id: '4',
      title: 'Interstellar',
      overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      releaseYear: 2014,
      genres: [
        { id: 2, name: 'Adventure' },
        { id: 3, name: 'Drama' },
        { id: 5, name: 'Sci-Fi' }
      ],
      rating: 8.6,
      runtime: 169,
      imageSet: {
        verticalPoster: {
          w240: 'https://image.tmdb.org/t/p/w240/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
          w360: 'https://image.tmdb.org/t/p/w360/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
          w480: 'https://image.tmdb.org/t/p/w480/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
          w600: 'https://image.tmdb.org/t/p/w600/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
          w720: 'https://image.tmdb.org/t/p/w720/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
        }
      },
      streamingOptions: {
        us: [
          {
            service: { id: 'paramount', name: 'Paramount+' },
            type: 'subscription',
            link: 'https://paramountplus.com'
          },
          {
            service: { id: 'prime', name: 'Amazon Prime' },
            type: 'rent',
            link: 'https://amazon.com'
          }
        ]
      }
    }
  ];

  return mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    (movie.genres && movie.genres.some(genre => genre.name.toLowerCase().includes(query.toLowerCase())))
  );
};
