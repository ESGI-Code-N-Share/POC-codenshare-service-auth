import * as express from "express";
import * as cors from 'cors';
import * as dotenv from "dotenv";
import {AuthRoute} from "./auth.routes";
import {loggerMiddleware} from "./middlewares/logger.middleware";
import {unknownRouteMiddleware} from "./middlewares/unknown-route.middleware";

dotenv.config();

const PORT = process.env.PORT || 8081;

export async function start_express() {

    const app = express();

    app.use(cors());
    app.use(cors({origin: [process.env.CLIENT_URL || "http://localhost:5173"]}));
    app.use(express.json());

    // logs
    app.use(loggerMiddleware());


    // test
    app.get("/ping", (_, res) => res.send("pong"));

    app.use(await AuthRoute.getRoutes());

    // undefined routes
    app.use(unknownRouteMiddleware());

    app.listen(PORT, async () => {
        console.log(`Server started on http://localhost:${PORT}/`);
    });
}