import fs from "fs/promises"
import { Item } from "../types/types"
const writeJSON = async (newArray: Item[]) => {
  const newData = {
    items: newArray,
  }
  await fs.writeFile("./db.json", JSON.stringify(newData, null, 2))
}

export { writeJSON }
