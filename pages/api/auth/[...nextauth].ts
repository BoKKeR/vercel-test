import KeycloakProvider from '@/auth/providers/keycloak'
import NextAuth from 'next-auth'

const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL
const keycloakPath = `/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect`

const url = keycloakUrl + keycloakPath

const refreshToken = async (token) => {
  try {
    const refreshUrl = `${url}/token`

    const response = await fetch(refreshUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
      method: 'POST',
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (e) {
    console.log(e)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    KeycloakProvider({
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      accessTokenUrl: `${url}/token`,
      requestTokenUrl: `${url}/auth`,
      authorizationUrl: `${url}/auth?response_type=code`,
      profileUrl: `${url}/userinfo`,
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (account && user) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
        }
      }

      if (Date.now() < token.accessTokenExpires) {
        return { ...token }
      }

      // Access token has expired, try to update it
      console.log('[auth] refreshing token')
      return refreshToken(token)
    },
    async session(session, token) {
      session.accessToken = token.accessToken

      // session.refreshToken = token.refreshToken

      return session
    },
  },
})
