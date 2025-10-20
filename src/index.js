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

const play = (request) => {
  // Here you can implement the logic for handling the /play endpoint
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } })
  }

  const contentType = request.headers.get('content-type') || ''

  const parseBody = () => {
    if (contentType.includes('application/json')) return request.json()
    if (contentType.includes('application/x-www-form-urlencoded')) {
      return request.formData().then(fd => Object.fromEntries(fd))
    }
    return request.text()
  }

  return parseBody()
    .then(body => new Response(JSON.stringify({ ok: true, received: body }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }))
    .catch(() => new Response('Bad Request', { status: 400 }))
}
