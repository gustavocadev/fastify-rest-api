const { readJSON } = require("../helpers/readJSON");
const { writeJSON } = require("../helpers/writeJSON");
const fastify = require("fastify");
const { v4: uuidv4 } = require("uuid");

const getItems = async (req, reply) => {
    const { items } = await readJSON();
    reply.send({ items });
};

const getItem = async (req, reply) => {
    const { items } = await readJSON();

    const { id } = req.params;

    const userFound = items.find((item) => item.id === id);
    reply.send({ userFound });
};

const createItem = async (req, reply) => {
    const { items } = await readJSON();

    const body = req.body;

    if (!body) {
        return reply.status(404).send({ msg: "Errors, there's no body :(" });
    }

    const newUser = {
        ...body,
        id: uuidv4(),
    };

    items.push(newUser);

    await writeJSON(items);

    reply.send(newUser);
};

const updateItem = async (req, reply) => {
    const { items } = await readJSON();
    const { id } = req.params;
    const body = req.body;

    if (!body) {
        return reply.status(404).send({ msg: "Errors, there's no body :(" });
    }

    const userFound = items.find((item) => item.id === id);

    if (!userFound) {
        return reply({ msg: "There's no user found" });
    }
    userFound.name = body.name;

    await writeJSON(items);

    reply.status(200).send({ items });
};

const deleteItem = async (req, reply) => {
    const { items } = await readJSON();

    const { id } = req.params;

    const userFound = items.find((item) => item.id === id);

    if (!userFound) {
        return reply({ msg: "There's no user found" });
    }
    const idxUserFound = items.indexOf(userFound);

    items.splice(idxUserFound, 1);

    await writeJSON(items);
    reply.send({ items });
};

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
};
