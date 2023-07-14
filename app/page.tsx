'use client';
import Container from '@/components/Container';
import { useAppContext } from '@/context/AppContext';
import EntryInterface from '@/interfaces/EntryInterface';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [entries, setEntries] = useState<EntryInterface[]>([]);
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    async function fetchEntries() {
      await getData();
    }

    fetchEntries();
  }, []);

  const navigateToPodcaster = (id: string) => () => {
    router.push(`/podcaster/${id}`);
  };

  async function getData() {
    if (state.stored) {
      setEntries(state.entries);
    } else {
      const res = await fetch(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
      );
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      let data = await res.json();
      const entries = data.feed.entry.map((entry: any) => {
        return {
          id: entry.id.attributes['im:id'],
          name: entry['im:name'].label,
          artist: entry['im:artist'].label,
          imageUrl: entry['im:image'][2].label,
        };
      });
      setEntries(entries);
      dispatch({ type: 'setStored', value: true });
      dispatch({ type: 'setEntries', value: entries });
    }
  }

  return (
    <>
      <Head>
        <title>
          Their Side - Conversations with the most tragically misunderstood
          people of our time
        </title>
        <meta
          name="description"
          content="Conversations with the most tragically misunderstood people of our time."
        />
      </Head>
      <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Podcaster
          </h1>
        </Container>
        <div className="bg-white py-32">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <div className="mx-auto max-w-2xl">
              <div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Filter podcasts..."
                  />
                </div>
              </div>
            </div>
            <ul
              role="list"
              className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  onClick={navigateToPodcaster(entry.id)}
                  className="cursor-pointer"
                >
                  <Image
                    className="mx-auto h-56 w-56 rounded-full"
                    src={entry.imageUrl}
                    alt="person image"
                    width={224}
                    height={224}
                  />
                  <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {entry.name}
                  </h3>
                  <p className="text-sm leading-6 text-gray-600">
                    Author: {entry.artist}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
