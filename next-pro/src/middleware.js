// // src/middleware.js
// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(request) {
//   const token = await getToken({ req: request });
//   const isAuth = !!token;
//   const isAdmin = token?.user?.role === 'admin';
//   const isAdminDashboard = request.nextUrl.pathname.startsWith('/adminDashboard');

//   // Redirect to login if accessing admin dashboard without authentication
//   if (isAdminDashboard && !isAuth) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // Redirect to home if accessing admin dashboard without admin rights
//   if (isAdminDashboard && !isAdmin) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/adminDashboard/:path*']
// };

// src/middleware.js
export async function middleware(request) {
    // No validation for now - just pass through all requests
    return;
  }
  
  // Empty matcher so this doesn't run on any routes
  export const config = {
    matcher: []
  };