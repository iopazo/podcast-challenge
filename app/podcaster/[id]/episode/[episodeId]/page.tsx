'use client';
import ArtistCard from '@/components/ArtistCard';
import { useAppContext } from '@/context/AppContext';

export default function Episode() {
  const { state } = useAppContext();
  return (
    <>
      <div className="pb-12 pt-16 sm:pb-4 lg:pt-12 grid grid-cols-3 gap-3">
        <ArtistCard entry={state.selectedArtist} />
        <div className="col-span-2">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <h2 className="mt-2 text-lg font-bold text-slate-900">
                {state.selectedEpisode?.title}
              </h2>
              <p
                className="mt-1 text-base text-slate-700 pr-20 divide-red-50"
                dangerouslySetInnerHTML={{
                  __html: state.selectedEpisode?.description || '',
                }}
              ></p>
              <audio controls>
                <source src={state.selectedEpisode?.mp3Url} type="audio/ogg" />
                <source src={state.selectedEpisode?.mp3Url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
