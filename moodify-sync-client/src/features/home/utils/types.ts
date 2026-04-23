export interface Song {
  id: string;
  title: string;
  mood: string;
  url: string;
  posterUrl: string;
}

export interface GetSongParams {
  mood: string;
}

export interface GetSongsResponse {
  message: string;
  songs: Song[];
}

export interface GetSongResponse {
  message: string;
  song: Song;
}
