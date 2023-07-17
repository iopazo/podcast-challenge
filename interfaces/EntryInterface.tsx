export default interface EntryInterface {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
  title?: string;
  releaseDate?: Date;
  duration: number;
  trackId?: number;
}
