const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const { PORT } = require("./utils/config");

const typeDefs = `
#graphql
    type Todo{
        userId:ID!
        id:ID!
        title:String!
        completed:Boolean
    }

    type Query{
        getTodos:[Todo]
    }
`;

const resolvers = {
  Query: {},
};

const init = async () => {
  const app = express();
  app.use(express.json());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  app.get("/", (req, res) => {
    return res.status(200).json({ msg: "Express server running" });
  });
  app.use("/graphql", expressMiddleware(server));
  app.listen(Number(PORT), () => {
    console.log(`Server running on port:${PORT}`);
  });
};

init();
