import { FastifyInstance, FastifyPluginAsync } from "fastify"
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/items.controllers"

const Item = {
  type: "object",
  properties: {
    name: { type: "string" },
    id: { type: "string" },
  },
}

const Items = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: Item,
    },
  },
}

// options for get all items
const getItemsOpts = {
  schema: {
    response: {
      200: Items,
    },
  },

  handler: getItems,
}

const getItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: getItem,
}

const createItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      200: Item,
    },
  },

  handler: createItem,
}

const updateItemOpts = {
  schema: {
    response: {
      200: Items,
    },
  },

  handler: updateItem,
}

const deleteItemOpts = {
  handler: deleteItem,
}

const itemsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get("/items", getItemsOpts)

  fastify.get("/items/:id", getItemOpts)

  fastify.post("/items", createItemOpts)

  fastify.put("/items/:id", updateItemOpts)

  fastify.delete("/items/:id", deleteItemOpts)
}

export { itemsRoutes }
