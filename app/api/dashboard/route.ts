import { NextResponse } from 'next/server';

export async function GET() {
  // Returning in-memory dummy data instead of using a database.
  const dashboardData = [
    {
      id: 1,
      title: 'Revenue',
      value: 12000,
      status: 'Active',
      description: 'Total revenue for this period',
    },
    {
      id: 2,
      title: 'New Users',
      value: 48,
      status: 'Paused',
      description: 'Number of users who signed up recently',
    },
    {
      id: 3,
      title: 'Errors',
      value: 5,
      status: 'Critical',
      description: 'Last 24 hours error count',
    },
    {
      id: 4,
      title: 'Active Subscriptions',
      value: 86,
      status: 'Active',
      description: 'Ongoing subscriptions in the system',
    },
    {
      id: 5,
      title: 'Pending Orders',
      value: 12,
      status: 'Paused',
      description: 'Customer orders awaiting fulfillment',
    },
    {
      id: 6,
      title: 'Support Tickets',
      value: 3,
      status: 'Critical',
      description: 'Urgent tickets needing attention',
    },
  ];

  return NextResponse.json(dashboardData);
}
