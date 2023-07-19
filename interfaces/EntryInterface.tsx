export default interface EntryInterface {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
  title?: string;
  releaseDate?: string;
  duration: number;
  trackId?: number;
  summary?: string;
}
