export interface StreamingService {
  service: {
    id: string;
    name: string;
  };
  type: string;
  link: string;
}

interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: string;
  title: string;
  overview?: string;
  firstAirYear?: number;
  lastAirYear?: number;
  releaseYear?: number;
  genres?: Genre[];
  rating?: number;
  runtime?: number;
  imageSet?: {
    verticalPoster?: {
      w240?: string;
      w360?: string;
      w480?: string;
      w600?: string;
      w720?: string;
    };
  };
  streamingOptions?: {
    [country: string]: StreamingService[];
  };
}
