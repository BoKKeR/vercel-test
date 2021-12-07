import config from '@/config'
import useSession from '@/hooks/useSession'
import { UserTypes } from '@/types/user'

export const getRoles = () => {
  const [session] = useSession()

  if (!session) {
    return []
  }

  const user = session.tokenUser

  if (!user) {
    return []
  }

  const realmRoles = user.realm_access?.roles
  const clientRoles =
    user.resource_access &&
    user.resource_access[config.KEYCLOAK_CLIENT_ID] &&
    user.resource_access[config.KEYCLOAK_CLIENT_ID].roles

  const roles = [...(realmRoles || []), ...(clientRoles || [])]

  return roles
}

export const getUserType = () => {
  const roles = getRoles()
  const userTypes = Object.values(UserTypes)

  return roles.find((role: UserTypes) => userTypes.includes(role))
}

export const hasPermission = (permission: string) => {
  const userRoles = getRoles()
  return userRoles.includes(permission)
}
