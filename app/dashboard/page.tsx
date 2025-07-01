import { Suspense } from 'react';

interface DashboardItem {
  id: number;
  title: string;
  value: number;
  status: string;
  description: string;
}

async function fetchDashboardData() {
  const res = await fetch('http://localhost:3000/api/dashboard', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  const data: DashboardItem[] = await res.json();
  return data;
}

function DashboardCard({ item }: { item: DashboardItem }) {
  let statusClasses = '';

  switch (item.status.toLowerCase()) {
    case 'active':
      statusClasses = 'bg-green-100 text-green-800';
      break;
    case 'paused':
      statusClasses = 'bg-yellow-100 text-yellow-800';
      break;
    default:
      statusClasses = 'bg-red-100 text-red-800';
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        {item.title}
      </h2>
      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">${item.value}</span>
        <span className={`px-3 py-1 text-sm rounded-full ${statusClasses}`}>{item.status}</span>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const data = await fetchDashboardData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Cool Dashboard</h1>
        <Suspense fallback={<div className='text-white'>Loading...</div>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => (
              <DashboardCard key={item.id} item={item} />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
