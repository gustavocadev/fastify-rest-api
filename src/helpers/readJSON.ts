import fs from "fs/promises"
import { Item } from "../types/types"

type ReadJSON = {
  items: Item[]
}

const readJSON = async (): Promise<ReadJSON> => {
  const data = await fs.readFile("./db.json", "utf-8")

  return JSON.parse(data)
}

export { readJSON }
