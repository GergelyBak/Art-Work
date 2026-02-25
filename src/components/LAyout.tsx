import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='flex justify-between items-center px-8 py-4 bg-white shadow-sm'>
        <Link to='/' className='text-xl font-bold'>
          Art Explorer
        </Link>

        <Link
          to='/explore'
          className='px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90 transition'
        >
          Explore
        </Link>
      </header>

      <main className='px-6 py-10 max-w-6xl mx-auto'>
        <Outlet />
      </main>
    </div>
  );
}
