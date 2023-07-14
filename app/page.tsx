import Container from '@/components/Container'
import EpisodeEntry from '@/components/EpisodeEntry'
import Head from 'next/head'

const episodes = [
  {
    id: 1,
    title: 'Episode 1: The Unabomber',
    description: 'The Unabomber is a misunderstood genius who was trying to save the world from technology.',
    published: '2021-01-01',
    audio: {
      src: '/audio/episode-1.mp3',
      type: 'audio/mpeg',
    },
  }
];

export default function Home() {
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
        
      </div>
    </>
  )
}
