import 'next'

declare module 'next' {
  // Override the PageProps type to match what your app is actually using
  export interface PageProps {
    params: { [key: string]: string }
    searchParams?: { [key: string]: string | string[] | undefined }
  }
}