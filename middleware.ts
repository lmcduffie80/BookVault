export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/api/clients/:path*', '/api/invoices/:path*', '/api/contracts/:path*', '/api/projects/:path*', '/api/tasks/:path*', '/api/payments/:path*'],
};
