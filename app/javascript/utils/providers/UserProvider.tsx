import React, {createContext} from "react"
import { UserType } from "../../react/types"

/*
 * Context
 */

type UserContextType = {
  user: UserType
  refetch: () => void
}

export const UserContext = createContext<UserContextType>({
  user: {},
  refetch: () => {}
})

/*
 * Provider
 */

export const UserProvider = (props) => {

  const {
    children,
    user,
    refetch
  } = props

  /*
   * Render
   */

  return (
    <UserContext.Provider
      value={{
        user: user,
        refetch: refetch
      }}
    >
      { children }
    </UserContext.Provider>
  )

}