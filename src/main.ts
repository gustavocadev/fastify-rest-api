import fastify from "fastify"
import { itemsRoutes } from "./routes/items.routes"

const app = fastify({ logger: true })

app.register(itemsRoutes)

const start = async () => {
  try {
    await app.listen(3000)
  } catch (error) {
    app.log.error(error)
  }
}

start()
