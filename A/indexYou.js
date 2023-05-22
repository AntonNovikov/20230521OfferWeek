let input = {
  routeTree: {
    route: "/",
    title: "Карта",
    children: [
      {
        route: "stars",
        title: "Звезды",
        children: [
          {
            route: ":starId",
          },
        ],
      },
      {
        route: "constellations",
        title: "Созвездия",
      },
      {
        route: "constellation",
        redirectTo: "constellations",
        children: [
          {
            route: ":constellationId",
            children: [
              {
                route: "stars",
                title: "Звезды",
                children: [
                  {
                    route: ":starId",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  data: {
    constellation: {
      1: "Лира",
      2: "Орион",
    },
    star: {
      1: "Вега",
      2: "Бетельгейзе",
    },
  },
  urls: ["/stars/1", "/constellation/2/stars/2"],
};

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

const routes = input.urls.reduce((acc, currUrl) => {
  const path = currUrl.split("?")[0];
  const result = findRoutes(input.routeTree, "", [path], input.data);
  return acc.concat(result);
}, []);

console.log(routes);

console.log("Ответ");
const routes2 = findRoutes(input.routeTree, "", input.urls, input.data);
console.log(routes2);
// [
  // [
  //   { "route": "/", "title": "Карта" },
  //   { "title": "Звезды", "route": "/stars" },
  //   { "route": "/stars/1", "title": "Вега" }
  // ],
  // [
  //   { "route": "/", "title": "Карта" },
  //   { "title": "Созвездия", "route": "/constellations" },
  //   { "route": "/constellation/2", "title": "Орион" },
  //   { "title": "Звезды", "route": "/constellation/2/stars" },
  //   { "route": "/constellation/2/stars/2", "title": "Бетельгейзе" }
  // ]
// ]
