import Image from 'next/image';
import Container from './Container';
import Link from 'next/link';
import EntryInterface from '@/interfaces/EntryInterface';

function ArtistCard({ entry }: { entry: EntryInterface | null }) {
  return (
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
          <Link href={`/podcaster/${entry?.id}`}>{entry?.name}</Link>
        </h2>
        <p className="mt-1 text-sm text-slate-700">by {entry?.artist}</p>

        <h3 className="mt-2 text-sm font-bold text-slate-900">Description</h3>
        <p
          className="mt-1 text-base text-slate-700 w-80 divide-red-50"
          dangerouslySetInnerHTML={{ __html: entry?.summary || '' }}
        ></p>
      </div>
    </Container>
  );
}

export default ArtistCard;
