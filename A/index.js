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

function generateRoutes(input) {
  let result = [];
  let { routeTree, data, urls } = input;

  // Parse routeTree and data to extract necessary information
  let constellationsTitle = routeTree.children.find(
    (child) => child.route === "constellations"
  ).title;

  for (let i = 0; i < urls.length; i++) {
    let url = urls[i];
    let segments = url.split("/");

    // Generate corresponding route and title for this URL
    let route = "";
    let title = "";
    for (let j = 1; j < segments.length; j++) {
      let segment = segments[j];
      let node = routeTree.children.find((child) => child.route === segment);
      if (!node) {
        let entityName = data[segments[j - 1].slice(1)][segment]; // Extract entity name using previous segment
        title += `${entityName} - `;
      } else {
        route += `/${node.route}`;
        if (node.redirectTo) {
          route += `/${node.redirectTo}`;
        }
        if (node.title) {
          title += `${node.title} - `;
        } else {
          let entityName = node.children.find(
            (child) => child.route === segments[j + 1]
          );
          if (entityName) {
            title += `${entityName.title} - `;
          }
        }
      }
    }

    result.push({
      route: route,
      title: title.slice(0, -3), // Remove trailing " - "
    });
  }

  return result;
}
// let { routeTree, data, urls } = input;
// console.log(routeTree, data, urls);
console.log(generateRoutes(input));

// module.exports = function (routeTree, data, urls) {
//     const result = [];
//     for (const url of urls) {
//         const segments = url.split('/').slice(1);
//         const route = findRoute(routeTree, segments, data);
//         if (route) {
//             result.push(route);
//         }
//     }
//     return result;
// };
console.log("Ответ");
// [
    [
      { "route": "/", "title": "Карта" },
      { "title": "Звезды", "route": "/stars" },
      { "route": "/stars/1", "title": "Вега" }
    ],
    [
      { "route": "/", "title": "Карта" },
      { "title": "Созвездия", "route": "/constellations" },
      { "route": "/constellation/2", "title": "Орион" },
      { "title": "Звезды", "route": "/constellation/2/stars" },
      { "route": "/constellation/2/stars/2", "title": "Бетельгейзе" }
    ]
//   ]
