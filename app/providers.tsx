'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect, useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.addEventListener('popstate', function() {
      window.scrollTo(0, 0);
  });
  },[])
  const [client] = useState(new QueryClient())

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
