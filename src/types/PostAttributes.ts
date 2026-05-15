export interface PostAttributes {
  title?: string;
  description?: string;
  image?: {
    url?: string;
    alt?: string;
  };
  author?: string;
  pubDate?: string;
  tags?: string[];
}

