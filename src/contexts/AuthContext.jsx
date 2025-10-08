import { createContext, useState, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { jwtDecode } from 'jwt-decode'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../api/users'

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  username: null,
  sub: null,
})

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  const { sub } = token ? jwtDecode(token) : {}

  const userInfoQuery = useQuery({
    queryKey: ['users', sub],
    queryFn: () => getUserInfo(sub),
    enabled: !!sub,
  })
  const userInfo = userInfoQuery.data ?? {}
  const username = userInfo.username

  const value = useMemo(
    () => ({ token, setToken, username, sub }),
    [token, username, sub],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export function useAuth() {
  return useContext(AuthContext)
}
