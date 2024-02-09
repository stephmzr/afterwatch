const flattenRoutes = (routes: any[]) => {
  let rts: any[] = []
  routes.forEach(route => {
    if(route.children) rts = rts.concat(route.children)
    else rts.push(route)

  })
  return rts;
};

export default flattenRoutes;
