import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function middleware(request) {
  const response = NextResponse.next();

  const deviceId = request.cookies.get('device_id');

  if (!deviceId) {
    const newDeviceId = uuidv4();

    response.cookies.set('device_id', newDeviceId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: null,
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });

    console.log(`Сгенерирован новый device_id: ${newDeviceId}`);
  }

  return response;
}
