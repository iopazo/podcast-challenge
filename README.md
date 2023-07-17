This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, you need to create a file with the environment variables, in this case for localjh name it .env.local and put this:

````
NEXT_PUBLIC_URL_ITUNES_ENTRIES=https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json
NEXT_PUBLIC_URL_LOOKUP=https://itunes.apple.com/lookup
NEXT_PUBLIC_ALL_ORIGIN_URL=https://api.allorigins.win/get
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
````
