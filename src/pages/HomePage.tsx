import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-10 mt-24'>
      {/* Title */}
      <div className='space-y-4'>
        <h1 className='text-5xl font-bold tracking-tight'>Art Explorer</h1>

        <p className='text-gray-500 max-w-xl mx-auto text-lg'>
          Discover masterpieces from the Art Institute of Chicago and curate
          your own personal gallery.
        </p>
      </div>

      {/* CTA */}
      <Link
        to='/explore'
        className='px-8 py-4 bg-black text-white rounded-2xl text-lg hover:opacity-90 transition shadow-md'
      >
        Start Exploring
      </Link>

      {/* Subtle Feature List */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-4xl'>
        <div className='p-6 rounded-2xl bg-gray-50 shadow-sm'>
          <h3 className='font-semibold mb-2'>Search</h3>
          <p className='text-gray-500 text-sm'>
            Find artworks instantly with a powerful search.
          </p>
        </div>

        <div className='p-6 rounded-2xl bg-gray-50 shadow-sm'>
          <h3 className='font-semibold mb-2'>Preview</h3>
          <p className='text-gray-500 text-sm'>
            Open detailed previews in a clean modal.
          </p>
        </div>

        <div className='p-6 rounded-2xl bg-gray-50 shadow-sm'>
          <h3 className='font-semibold mb-2'>Collect</h3>
          <p className='text-gray-500 text-sm'>
            Build your own curated digital gallery.
          </p>
        </div>
      </div>
    </div>
  );
}
