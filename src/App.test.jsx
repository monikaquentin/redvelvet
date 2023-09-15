import '@/i18n'

import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import App, { Endpoint } from '@/App'

describe('App', () => {
  it('Renders write in path', () => {
    // ARRANGE
    render(
      <MemoryRouter initialEntries={['/write']}>
        <Endpoint />
      </MemoryRouter>
    )
    // ACT
    // EXPECT
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Writing')
  })
  it('Renders not found if invalid path', () => {
    // ARRANGE
    render(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <Endpoint />
      </MemoryRouter>
    )
    // ACT
    // EXPECT
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(`© ${new Date().getFullYear()}`)
  })
})
