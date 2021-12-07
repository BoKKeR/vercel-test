const protocol = process.env.NODE_ENV !== 'production' ? 'http' : 'https'

type KeycloakProviderOptions = {
  domain: string
  clientId: string
  clientSecret: string
}

const KeycloakProvider = (options: any) => {
  return {
    id: 'keycloak',
    name: 'keycloak',
    type: 'oauth',
    version: '2.0',
    params: { grant_type: 'authorization_code' },
    scope: 'openid profile',
    profile: async (profile, tokens) => ({ ...profile, id: profile.sub, ...tokens }),
    ...options,
  }
}

export default KeycloakProvider
