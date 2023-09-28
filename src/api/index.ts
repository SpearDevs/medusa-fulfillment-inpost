import express, { Router } from "express";
import { errorHandler } from "@medusajs/medusa"
import adminRoutes from "./routes/admin";

export default (rootDirectory, options) => {
  const router = Router()

  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));

  adminRoutes(router, options);
  // storeRoutes(router, options)

  router.use(errorHandler())

  return router;
}
