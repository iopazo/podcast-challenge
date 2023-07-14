import { useMemo } from 'react';
import Container from './Container';
import Link from 'next/link';

interface AudioPlayerData {
  src: string;
  type: string;
}

interface EpisodeEntryProps {
  episode: {
    id: number;
    title: string;
    description: string;
    published: string;
    audio: AudioPlayerData;
  };
}

function EpisodeEntry({ episode }: EpisodeEntryProps) {
  let audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type,
      },
      link: `/${episode.id}`,
    }),
    [episode],
  );
  // let player = useAudioPlayer(audioPlayerData)

  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${episode.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={`/${episode.id}`}>{episode.title}</Link>
          </h2>

          <p className="mt-1 text-base leading-7 text-slate-700">
            {episode.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              href={`/${episode.id}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`Show notes for episode ${episode.title}`}
            >
              Show notes
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}

export default EpisodeEntry;
