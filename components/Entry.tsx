import { useAppContext } from '@/context/AppContext';
import EntryInterface from '@/interfaces/EntryInterface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Entry({ entry }: { entry: EntryInterface }) {
  const router = useRouter();
  const { dispatch } = useAppContext();

  const navigateToPodcaster = (id: string) => () => {
    dispatch({ type: 'setSelectedArtist', value: entry });
    router.push(`/podcaster/${id}`);
  };
  return (
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
        priority
      />
      <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
        {entry.name}
      </h3>
      <p className="text-sm leading-6 text-gray-600">Author: {entry.artist}</p>
    </li>
  );
}

export default Entry;
