import { useSession } from 'next-auth/react';

const useUser = () => {

  const { data: session, status } = useSession()
  const isUser = !!session?.user
  const user = isUser ? session.user : null

  return { isUser, user, session, status }

}

export default useUser