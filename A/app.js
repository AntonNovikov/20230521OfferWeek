const { findRoutes } = require("./findRoutes");
const { input } = require("./data");

// const routes = findRoutes(input.routeTree, "", input.urls, input.data);
// console.log(routes);

function getRoutes(input) {
  const { urls, routeTree, data } = input;
  const routes = [];

  urls.forEach((url) => {
    console.log(url)
    const parts = url.split("/").filter((part) => part !== "");
    console.log(parts);
    let pathFull = "";
    let currNode = routeTree;
    const route = [];
    route.push({ route: "/", title: "Карта" }); //начало пути
    pathFull += "/";
    endUrl = url;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const node = currNode.children.find((child) => child.route === part);
      if (!node) break;
      currNode = node;
      pathFull = pathFull + parts.slice(0, i + 1).join("/");
      route.push({
        // route: "/" + parts.slice(0, i + 1).join("/"),
        route: pathFull,
        // route: pathFull = pathFull + parts.slice(0, i + 1).join("/"),
        title: node.title,
      });
      route.push({ route: endUrl, title: "Карта" })
    }
    if (route.length > 0) routes.push(route);
  });

  return routes.map((route) => {
    console.log("route:  ",route)
    // const last = route.pop();
    // const dataKey = last.route.match(/\/(\d+)$/);
    // if (dataKey) last.title = data[last.title][dataKey[1]];
    // route.push(last);
    return route;
  });
}

let first = Object.keys(input)[1]
console.log("first: ", first)
console.log("urls: ", input[first])
console.log("urls 1: ", Object.keys(input[first]))
const output = getRoutes(input);
console.log(output);
