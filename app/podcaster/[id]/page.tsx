'use client';
import ArtistCard from '@/components/ArtistCard';
import { useAppContext } from '@/context/AppContext';
import EpisodeInterface from '@/interfaces/EpisodeInterface';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Podcaster() {
  const { state, dispatch } = useAppContext();
  const params = useParams();
  const router = useRouter();
  const [episodes, setEpisodes] = useState<EpisodeInterface[]>([]);

  useEffect(() => {
    async function fetchPodcaster() {
      await getPodcaster();
    }
    fetchPodcaster();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getEncodeURL(url: string): string {
    return encodeURIComponent(url);
  }

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
      setEpisodes(
        parsedContent.results.map((episode: any) => {
          return {
            trackId: episode.trackId,
            title: episode.trackName,
            releaseDate: episode.releaseDate,
            duration: episode.trackTimeMillis,
            mp3Url: episode.previewUrl,
            description: episode.description,
          };
        }),
      );
    }
  };

  const millisToMinutesAndSeconds = (millis: number) => {
    const date = new Date(millis);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  const navigateToEpisode = (episode: EpisodeInterface) => {
    dispatch({ type: 'setSelectedEpisode', value: episode });
    router.push(
      `/podcaster/${state.selectedArtist?.id}/episode/${episode.trackId}`,
    );
  };

  return (
    <>
      <div className="pb-12 pt-16 sm:pb-4 lg:pt-12 grid grid-cols-3 gap-3">
        <ArtistCard entry={state.selectedArtist} />
        <div className="col-span-2">
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
                        <span
                          className="text-cyan-800 cursor-pointer"
                          onClick={() => navigateToEpisode(episode)}
                        >
                          {episode.title}
                        </span>
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
    </>
  );
}
