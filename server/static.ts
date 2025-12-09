import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = __dirname;

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static files but exclude server files
  app.use(express.static(distPath, {
    index: false, // Handle index manually for SPA fallback
    setHeaders: (res, path) => {
      // Prevent serving server-side code
      if (path.endsWith('.cjs') || path.endsWith('.map')) {
        res.status(403).end();
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    // Prevent serving server files directly via fallback (unlikely but safe)
    if (req.originalUrl.endsWith('.cjs')) {
      return res.status(403).send('Forbidden');
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
