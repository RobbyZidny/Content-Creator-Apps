import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";
import session from "express-session";
import createMemoryStore from "memorystore";

const app = express();
const httpServer = createServer(app);

// Helper for session type
declare module "express-session" {
    interface SessionData {
        userId?: string;
    }
}

// Helper for raw body
declare module "http" {
    interface IncomingMessage {
        rawBody: unknown;
    }
}

app.use(
    express.json({
        verify: (req, _res, buf) => {
            req.rawBody = buf;
        },
    }),
);

app.use(express.urlencoded({ extended: false }));

const MemoryStore = createMemoryStore(session);

app.use(
    session({
        secret: process.env.SESSION_SECRET || "creatorspace-secret-key-change-in-production",
        resave: false,
        saveUninitialized: false,
        store: new MemoryStore({
            checkPeriod: 86400000,
        }),
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        },
    })
);

// Register routes
// We need to wrap this because registerRoutes is async
// Vercel serverless functions handle async automatically if we export the app
// However, we need to ensure routes are registered before the first request.
// A common pattern is to just await it at module top level if supported, or wrap.
// But registerRoutes returns a Promise.
// For Vercel with Express, we usually export the app.

// Synchronous setup wrapper isn't ideal.
// Let's rely on the fact that we can attach routes to app.
registerRoutes(httpServer, app).catch(err => {
    console.error("Failed to register routes", err);
});

// Error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
});

export default app;
