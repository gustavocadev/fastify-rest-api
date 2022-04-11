import { readJSON } from "../helpers/readJSON"
import { writeJSON } from "../helpers/writeJSON"
import { randomUUID } from "crypto"
import { FastifyReply, FastifyRequest } from "fastify"

const getItems = async (req: FastifyRequest, reply: FastifyReply) => {
  const { items } = await readJSON()
  reply.send({ items })
}

const getItem = async (req: FastifyRequest, reply: FastifyReply) => {
  const { items } = await readJSON()

  const { id } = req.params as {
    id: string
  }

  const userFound = items.find((item) => item.id === id)
  reply.send({ userFound })
}

const createItem = async (req: FastifyRequest, reply: FastifyReply) => {
  const { items } = await readJSON()

  // todo: I need to type this
  const body = req.body as any

  if (!body) {
    return reply.status(404).send({ msg: "Errors, there's no body :(" })
  }

  const newUser = {
    ...body,
    id: randomUUID(),
  }

  items.push(newUser)

  await writeJSON(items)

  reply.send(newUser)
}

const updateItem = async (req: FastifyRequest, reply: FastifyReply) => {
  const { items } = await readJSON()
  const { id } = req.params as {
    id: string
  }
  const body = req.body

  if (!body) {
    return reply.status(404).send({ msg: "Errors, there's no body :(" })
  }

  const userFound = items.find((item) => item.id === id)

  if (!userFound) {
    return { msg: "There's no user found" }
  }
  userFound.name = (body as any).name

  await writeJSON(items)

  reply.status(200).send({ items })
}

const deleteItem = async (req: FastifyRequest, reply: FastifyReply) => {
  const { items } = await readJSON()

  const { id } = req.params as {
    id: string
  }

  const userFound = items.find((item) => item.id === id)

  if (!userFound) {
    return { msg: "There's no user found" }
  }
  const idxUserFound = items.indexOf(userFound)

  items.splice(idxUserFound, 1)

  await writeJSON(items)
  return { items }
}

export { getItems, getItem, createItem, updateItem, deleteItem }
