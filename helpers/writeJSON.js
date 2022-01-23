const fs = require("fs/promises");

const writeJSON = async (newArray) => {
    const newData = {
        items: newArray,
    };
    await fs.writeFile("./db.json", JSON.stringify(newData, null, 4));
};

module.exports = { writeJSON };
