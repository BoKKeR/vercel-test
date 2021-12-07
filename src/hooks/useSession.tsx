import { useProfile } from '@/redux/selectors/profile.selectors'
import { Session } from '@/types/auth'
import jwt_decode from 'jwt-decode'
import { useSession as useNextAuthSession } from 'next-auth/client'

const useSession = (): [Session, boolean] => {
  const [session, isSessionLoading] = useNextAuthSession()
  const { profile, loading: isProfileLoading } = useProfile()

  if (session && profile) {
    session.dbUser = profile
  }

  if (session?.accessToken) {
    //@ts-ignore
    session.tokenUser = jwt_decode(session.accessToken)
  }

  //@ts-ignore
  return [session, isSessionLoading || isProfileLoading]
}

export default useSession
