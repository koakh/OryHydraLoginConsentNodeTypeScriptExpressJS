import express, { NextFunction, Request, Response } from "express"

const router = express.Router()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get("/", (_req: Request, res: Response, _next: NextFunction) => {
  res.render("forget", {
    message: "Forget stub",
    subMessage: "work in progress",
  })
})

export default router
