'use client';
import Container from '@/components/Container';
import EpisodeEntry from '@/components/EpisodeEntry';
import EntryInterface from '@/interfaces/EntryInterface';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Podcaster() {
  const params = useParams();
  const [entry, setEntry] = useState<EntryInterface | null>(null);
  const [episodes, setEpisodes] = useState<EntryInterface[]>([]);

  useEffect(() => {
    async function fetchPodcaster() {
      await getPodcaster();
    }

    fetchPodcaster();
  });

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
    console.log(parsedContent);

    if (parsedContent.results.length > 0) {
      setEpisodes(
        parsedContent.results.map((episode: any) => {
          return {
            id: episode.id,
            trackId: episode.trackId,
            name: episode.collectionName,
            artist: episode.artistName,
            imageUrl: episode.artworkUrl600,
            title: episode.trackName,
            releaseDate: episode.releaseDate,
            duration: episode.trackTimeMillis,
          };
        }),
      );
      const podcaster = parsedContent.results[0];
      setEntry({
        id: podcaster.id,
        name: podcaster.collectionName,
        artist: podcaster.artistName,
        imageUrl: podcaster.artworkUrl600,
        duration: 0,
      });
    }
  };

  const millisToMinutesAndSeconds = (millis: number) => {
    const date = new Date(millis);

    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <>
      <div className="pb-12 pt-16 sm:pb-4 lg:pt-12 flex flex-row">
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
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100 basis-1/2">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <h2>Episodes: </h2>
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {episodes.map((episode) => (
                      <tr key={`key-${episode.trackId}`}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {episode.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {episode?.releaseDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {millisToMinutesAndSeconds(episode.duration)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
