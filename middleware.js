import { NextResponse } from 'next/server';

const PASSWORD = 'letmein'; // Change this to your secret password
const COOKIE_NAME = 'customtab_auth';
const COOKIE_VALUE = 'authenticated';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow static files, API routes, and favicon
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/public') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.ico')
  ) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie === COOKIE_VALUE) {
    return NextResponse.next();
  }

  // If password submitted
  if (req.method === 'POST') {
    return req.formData().then(form => {
      const password = form.get('password');
      if (password === PASSWORD) {
        const res = NextResponse.redirect(req.nextUrl);
        res.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
          path: '/',
          maxAge: COOKIE_MAX_AGE,
          httpOnly: true,
          sameSite: 'Lax',
        });
        return res;
      } else {
        return new NextResponse(renderForm('Incorrect password!'), {
          status: 401,
          headers: { 'content-type': 'text/html' },
        });
      }
    });
  }

  // Show password form
  return new NextResponse(renderForm(), {
    status: 401,
    headers: { 'content-type': 'text/html' },
  });
}

function renderForm(error) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Protected</title>
    <style>
      body { background: #181a20; color: #fff; font-family: 'Space Grotesk', sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
      .box { background: #23263a; padding: 2rem 2.5rem; border-radius: 1.2rem; box-shadow: 0 4px 32px #0004; min-width: 320px; }
      input[type="password"] { width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: none; margin-bottom: 1rem; font-size: 1.1rem; background: #181a20; color: #fff; }
      button { width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: none; background: #a259ff; color: #fff; font-size: 1.1rem; font-weight: bold; cursor: pointer; }
      .error { color: #ff5c5c; margin-bottom: 1rem; text-align: center; }
    </style>
  </head>
  <body>
    <form class="box" method="POST">
      <h2 style="margin-bottom:1.5rem;">Protected Dashboard</h2>
      ${error ? `<div class="error">${error}</div>` : ''}
      <input type="password" name="password" placeholder="Enter password" autofocus autocomplete="current-password" />
      <button type="submit">Unlock</button>
    </form>
  </body>
  </html>`;
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon|public|.*\\.js|.*\\.css|.*\\.png|.*\\.ico).*)',
  ],
}; 