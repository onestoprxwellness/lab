'use server';

import { cookies, headers } from 'next/headers';

export async function handleServerRedirect() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get('access_token');
  const headersList = await headers();

  const header_url = headersList.get('x-url') || '';
  const domain = headersList.get('host') || '';

  const pathname = header_url.split(`${domain}`)[1];

  console.log('Pathname', pathname);

  return { pathname, header_url, access_token };
}
