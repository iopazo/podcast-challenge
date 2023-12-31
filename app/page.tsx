'use client';
import Entry from '@/components/Entry';
import { useAppContext } from '@/context/AppContext';
import EntryInterface from '@/interfaces/EntryInterface';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [entries, setEntries] = useState<EntryInterface[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<EntryInterface[]>([]);
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchEntries() {
      await getData();
    }
    fetchEntries();
  });

  useEffect(() => {
    setFilteredEntries(entries);
  }, [entries]);

  async function getData() {
    if (state.stored) {
      setEntries(state.entries);
      setLoading(false);
    } else {
      const res = await fetch(process.env.NEXT_PUBLIC_URL_ITUNES_ENTRIES || '');
      if (!res.ok) {
        setLoading(false);
        throw new Error('Failed to fetch data');
      }
      let data = await res.json();
      const entries = data.feed.entry.map((entry: any) => {
        return {
          id: entry.id.attributes['im:id'],
          name: entry['im:name'].label,
          artist: entry['im:artist'].label,
          imageUrl: entry['im:image'][2].label,
          summary: entry.summary.label,
        };
      });
      setEntries(entries);
      dispatch({ type: 'setStored', value: true });
      dispatch({ type: 'setEntries', value: entries });
      setLoading(false);
    }
  }

  const filterEntries = (searchTerm: string) => {
    if (searchTerm !== '') {
      const newEntries = entries.filter((entry) => {
        return (
          entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredEntries(newEntries);
    } else {
      setFilteredEntries(entries);
    }
  };

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
        <div className="bg-white py-32">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <div className="mx-auto max-w-2xl">
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Filter podcasts..."
                  onChange={(e) => {
                    filterEntries(e.target.value);
                  }}
                />
              </div>

              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mt-2">
                {loading && (
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  </span>
                )}
                {filteredEntries.length} results
              </span>
            </div>
            <ul
              role="list"
              className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
              {filteredEntries.map((entry) => (
                <Entry entry={entry} key={`entry-${entry.id}`} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
