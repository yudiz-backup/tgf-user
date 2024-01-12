const ENV = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://website.staging.tradefantasygame.com',
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://website.staging.tradefantasygame.com',
  S3_MEDIA_URL: process.env.NEXT_PUBLIC_S3_MEDIA_URL || 'https://tfg-frontend-s3.s3.ap-south-1.amazonaws.com/',
  S3_MEDIA_HOST: process.env.NEXT_PUBLIC_S3_MEDIA_HOST || 'tfg-frontend-s3.s3.ap-south-1.amazonaws.com',
}

export default ENV



