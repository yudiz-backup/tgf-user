/**
 * To guarantee that data remains isolated between users and requests,
 * while still maintaining a single QueryClient instance per request,
 * create a request-scoped singleton instance of QueryClient.
 *
 * Doing so makes prefetched queries accessible to all components throughout the component tree.
 * This approach also enables us to fetch data within multiple Server Components
 * and utilize <Hydrate> in numerous locations.
 */

import { QueryClient } from '@tanstack/query-core'
import { cache } from 'react'

const getQueryClient = cache(() => new QueryClient())
export default getQueryClient
