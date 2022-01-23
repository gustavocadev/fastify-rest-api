const fastify = require("fastify")({ logger: true });

fastify.register(require("./routes/items.routes"));

const start = async () => {
    try {
        await fastify.listen(3000);
    } catch (error) {
        fastify.log.error(error);
    }
};

start();
