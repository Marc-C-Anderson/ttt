import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test'
import { describe, it, expect } from 'vitest'
import worker from '../src'

describe('Hello', () => {
  describe('request for /message', () => {
    it('/ responds with "Hello" (unit style)', async () => {
      const request = new Request('http://example.com/message')
      // Create an empty context to pass to `worker.fetch()`.
      const ctx = createExecutionContext()
      const response = await worker.fetch(request, env, ctx)
      // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
      await waitOnExecutionContext(ctx)
      expect(await response.text()).toMatchInlineSnapshot('"Hello from TTT Worker!"')
    })

    it('responds with "Hello" (integration style)', async () => {
      const request = new Request('http://example.com/message')
      const response = await SELF.fetch(request)
      expect(await response.text()).toMatchInlineSnapshot('"Hello from TTT Worker!"')
    })
  })
})

describe('Play', () => {
  describe('GET request for /play', () => {
    it('/ responds with "Method Not Allowed" (unit style)', async () => {
      const request = new Request('http://example.com/play')
      // Create an empty context to pass to `worker.fetch()`.
      const ctx = createExecutionContext()
      const response = await worker.fetch(request, env, ctx)
      // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
      await waitOnExecutionContext(ctx)
      expect(await response.text()).toMatchInlineSnapshot('"Method Not Allowed"')
    })

    it('responds with "Method Not Allowed" (integration style)', async () => {
      const request = new Request('http://example.com/play')
      const response = await SELF.fetch(request)
      expect(await response.text()).toMatchInlineSnapshot('"Method Not Allowed"')
    })
  })

  describe('POST request for /play', () => {
    it('/ responds with "{"ok":true,"received":{"move":"rock"}}" (unit style)', async () => {
      // Create an empty context to pass to `worker.fetch()`.
      const ctx = createExecutionContext()
      // create a POST request based on the existing `request`
      const postRequest = new Request('http://example.com/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ move: 'rock' }) // adjust payload as needed
      })
      const response = await worker.fetch(postRequest, env, ctx)
      // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
      await waitOnExecutionContext(ctx)
      expect(await response.text()).toMatchInlineSnapshot('"{"ok":true,"received":{"move":"rock"}}"')
    })

    it('responds with "{"ok":true,"received":{"move":"rock"}}" (integration style)', async () => {
      const postRequest = new Request('http://example.com/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ move: 'rock' }) // adjust payload as needed
      })
      const response = await SELF.fetch(postRequest)
      expect(await response.text()).toMatchInlineSnapshot('"{"ok":true,"received":{"move":"rock"}}"')
    })
  })
})
