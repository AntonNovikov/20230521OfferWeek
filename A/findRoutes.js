function findRoutes(routeTree, currPath, targetUrls, data) {
  if (targetUrls.length === 0) {
    return [];
  }
  const currRoute = {
    route: currPath,
    title: routeTree.title,
  };
  if (routeTree.redirectTo) {
    // handle redirect route
    const redirectToPath = currPath.replace(
      routeTree.route,
      routeTree.redirectTo
    );
    return findRoutes(routeTree.children[0], redirectToPath, targetUrls, data);
  } else if (routeTree.children) {
    // handle nested routes
    let results = [];
    for (const child of routeTree.children) {
      const childPath = `${currPath}/${child.route}`;
      results = results.concat(findRoutes(child, childPath, targetUrls, data));
    }
    return results;
  } else if (targetUrls.includes(currPath)) {
    // handle target route match
    const pathArr = currPath.split("/").filter((path) => path !== "");
    let pathObjects = pathArr.map((path, index) => {
      const title =
        data[path.substring(1)] && data[path.substring(1)][pathArr[index + 1]];
      return {
        route: `/${path}`,
        title: title || path,
      };
    });
    pathObjects.unshift(currRoute);
    return [pathObjects];
  }
  return [];
}

module.exports = { findRoutes };
