import { Suspense } from 'react';

interface DashboardItem {
  id: string;
  title: string;
  description: string;
  value: number;
  status: string;
}

async function DashboardContent() {
  const res = await fetch('http://localhost:3000/api/dashboard', { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  const items: DashboardItem[] = await res.json();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
      {items.map((item) => (
        <div
          key={item.id}
          className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow'
        >
          <h3 className='text-lg font-semibold text-gray-900'>{item.title}</h3>
          <p className='text-gray-600 mt-2'>{item.description}</p>
          <div className='mt-4 flex justify-between items-center'>
            <span className='text-2xl font-bold text-gray-900'>{item.value}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              item.status === 'active' ? 'bg-green-100 text-green-800' :
              item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {item.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto py-6'>
        <h1 className='text-3xl font-bold text-gray-900 px-4 mb-6'>Dashboard</h1>
        <Suspense fallback={
          <div className='p-4 text-center'>
            Loading dashboard data...
          </div>
        }>
          <DashboardContent />
        </Suspense>
      </div>
    </div>
  );
}