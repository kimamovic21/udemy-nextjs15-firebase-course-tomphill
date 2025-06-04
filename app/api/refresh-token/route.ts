import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('redirect');

  if (!path) {
    return NextResponse.redirect(new URL('/', request.url));
  };

  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('firebaseAuthRefreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/', request.url));
  };

  const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  try {
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${firebaseApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const json = await response.json();

    const newToken = json.id_token;

    cookieStore.set('firebaseAuthToken', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return NextResponse.redirect(new URL(path, request.url));
  } catch (e) {
    console.error('Failed to refresh token: ', e);
    return NextResponse.redirect(new URL('/', request.url));
  };
};