import ENV from '../envs'
import { FetchInterface } from '../ts/interfaces/generic.interface'

const BASE_URL = ENV.BACKEND_URL || ''
export const request = async (options: FetchInterface) => {
  try {
    const response = await fetch(BASE_URL + options.url, options.data)
    if (response.status !== 200 && typeof window !== "undefined") {
      dispatchEvent(
        new CustomEvent('apierror', {
          detail: { error: true, message: 'Something went wrong' },
        })
      )
      return null
    }
    const contentType = response.headers.get('content-type')

    if (!contentType) {
      return null
    }
    const isJSON = contentType.startsWith('application/json')

    if (isJSON) {
      return await response.json()
    } else {
      return await response.text()
    }
  } catch (error) {
    console.log('error', error)
  }
}
