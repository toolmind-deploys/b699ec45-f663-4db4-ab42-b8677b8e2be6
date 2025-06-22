import { firestore } from 'firebase-admin';
import { initFirebaseAdminSDK } from '@/config/firebase-admin-config';
import { NextRequest, NextResponse } from 'next/server';

initFirebaseAdminSDK();
const fsdb = firestore();

export async function GET(request: NextRequest) {
  try {
    const dashboardSnapshot = await fsdb.collection('dashboard-items').get();
    
    const items = dashboardSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching dashboard items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard items' },
      { status: 500 }
    );
  }
}