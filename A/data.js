const input = {
  urls: ["/stars/1", "/constellation/2/stars/2"],
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
    stars: {
      1: "Вега",
      2: "Альтаир",
    },
    constellation: {
      1: "Вега",
      2: "Орел",
    },
  },
};

module.exports = { input };
