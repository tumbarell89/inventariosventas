import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(/, /)[0] : request.headers.get("x-real-ip");
  
  return new Response(JSON.stringify({ ip: ip || "Unknown" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};