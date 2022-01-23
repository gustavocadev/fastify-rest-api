const fs = require("fs/promises");

const readJSON = async () => {
    const data = await fs.readFile("./db.json", "utf-8");

    return JSON.parse(data);
};

module.exports = { readJSON };
