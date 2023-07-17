'use client';
import Container from '@/components/Container';
import EpisodeEntry from '@/components/EpisodeEntry';
import EntryInterface from '@/interfaces/EntryInterface';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { parse } from 'node:path/posix';
import { useEffect, useState } from 'react';

const episodes = [
  {
    id: 1,
    title: 'Episode 1: The Unabomber',
    description:
      'The Unabomber is a misunderstood genius who was trying to save the world from technology.',
    published: '2021-01-01',
    audio: {
      src: '/audio/episode-1.mp3',
      type: 'audio/mpeg',
    },
  },
];

export default function Podcaster() {
  const params = useParams();
  const [entry, setEntry] = useState<EntryInterface | null>(null);

  useEffect(() => {
    async function fetchPodcaster() {
      await getPodcaster();
    }

    fetchPodcaster();
  }, []);

  const getEncodeURL = (url: string) => {
    return encodeURIComponent(url);
  };

  const getPodcaster = async () => {
    const encodedUrl = getEncodeURL(
      `${process.env.NEXT_PUBLIC_URL_LOOKUP}?id=${params.id}&media=podcast&entity=podcastEpisode&limit=100`,
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ALL_ORIGIN_URL}?url=${encodedUrl}` || '',
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    let data = await res.json();
    const parsedContent = JSON.parse(data.contents);
    if (parsedContent.results.length > 0) {
      const podcaster = parsedContent.results[0];
      setEntry({
        id: podcaster.id,
        name: podcaster.collectionName,
        artist: podcaster.artistName,
        imageUrl: podcaster.artworkUrl600,
      });
    }
  };

  return (
    <>
      <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
        <Container>
          <div className="flex flex-col items-start">
            {entry?.imageUrl && (
              <Image
                className="h-56 w-56 rounded-full"
                src={entry.imageUrl}
                alt="person image"
                width={224}
                height={224}
                priority
              />
            )}

            <h2 className="mt-2 text-lg font-bold text-slate-900">
              <Link href={`/${entry?.id}`}>{entry?.name}</Link>
            </h2>
            <p className="mt-1 text-sm text-slate-700">by {entry?.artist}</p>

            <h3 className="mt-2 text-sm font-bold text-slate-900">
              Description
            </h3>
            <p className="mt-1 text-base text-slate-700 w-1/3 divide-red-50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {/* {entry && <EpisodeEntry key={entry.id} entry={entry} />} */}
        </div>
      </div>
    </>
  );
}
