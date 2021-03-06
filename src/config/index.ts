const config = {
  KB_BACKEND_URL: process.env.NEXT_PUBLIC_KB_BACKEND_URL,
  IMAGE_UPLOAD_URL: process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL,
  IMAGE_HOST_URL: process.env.NEXT_PUBLIC_IMAGE_HOST_URL,
  NODE_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  RECAPTCHA_V2_SITEKEY: process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITEKEY,
  QMKCONFIG_URL: process.env.NEXT_PUBLIC_QMKCONFIG_URL,
  URL: process.env.NEXT_PUBLIC_URL,
  KEYCLOAK_URL: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
  KEYCLOAK_REALM: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_ID: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
}

export default config
