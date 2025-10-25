/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch (request, env, ctx) {
    const url = new URL(request.url)
    switch (url.pathname) {
      case '/message':
        return new Response('Hello from TTT Worker!')
      case '/play':
        return play(request)
      default:
        return new Response('Not Found', { status: 404 })
    }
  }
}

const play = async (request) => {
  // Here you can implement the logic for handling the /play endpoint
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } })
  }
  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } })
  }
  // hereafter we are actioning a POST of json
  console.debug('request: ', await request.json())
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}
