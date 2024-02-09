export const hasRoles = (user, roles: string[]) => {
  return !!roles?.filter(role => roles.includes(user?.role)).length
}