import Container from '@/components/global/Container'

import { Link } from 'react-router-dom'

function NotFound() {
  const header = {
    title: 'RedVelvet'
  }
  return (
    <Container header={header}>
      <main className="grid min-h-full place-items-center bg-white-color px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Not Found</h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/" className="text-sm">
              Go back home
            </Link>
            <a href="mailto:re@redvelvet.me" className="text-sm">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </Container>
  )
}

export default NotFound
