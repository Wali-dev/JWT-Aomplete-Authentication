const express = require('express');
const apiRouter = express.Router();

const userRoute = require("./userRoute");
const linksRoute = require("./linkRoute");
const clicksRoute = require("./clickRoute");
const profileVisitRoute = require("./profileVisitRoute");

const routers = [
    {
        path: '/user',
        router: userRoute,
    },
    {
        path: '/link',
        router: linksRoute,
    },
    {
        path: '/click',
        router: clicksRoute,
    },
    {
        path: '/profilevisit',
        router: profileVisitRoute,
    }
];


routers.forEach((routerObject) => {
    apiRouter.use(routerObject.path, routerObject.router);
});

module.exports = apiRouter;