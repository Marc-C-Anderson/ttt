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

  // describe('request for /random', () => {
  //   it('/ responds with a random UUID (unit style)', async () => {
  //     const request = new Request('http://example.com/random')
  //     // Create an empty context to pass to `worker.fetch()`.
  //     const ctx = createExecutionContext()
  //     const response = await worker.fetch(request, env, ctx)
  //     // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
  //     await waitOnExecutionContext(ctx)
  //     expect(await response.text()).toMatch(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/)
  //   })

  //   it('responds with a random UUID (integration style)', async () => {
  //     const request = new Request('http://example.com/random')
  //     const response = await SELF.fetch(request)
  //     expect(await response.text()).toMatch(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/)
  //   })
  // })
})
