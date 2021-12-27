import { GraphQLServer, PubSub } from 'graphql-yoga';
import * as db from './db';
import mongo from './mongo';
import mongoose from 'mongoose';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import Message from './resolvers/Message'
import ChatBox from './resolvers/ChatBox'

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    //Query,
    Mutation,
    //Subscription,
    // User,
    Message,
    ChatBox,
  },
  context: {
    db,
    pubsub,
  },
});

//mongoDB configuration
mongo();

mongoose.connection.once('open', () => {
    console.log('MongoDB connected!');
    // const PORT = process.env.PORT || 5500;
    // server.start({ PORT }, () => {
    //   console.log(`The server is up on port ${PORT}!`);
    // });
    server.start({ port: process.env.PORT || 5500 }, () => {
      console.log(`The server is up on port ${process.env.PORT || 5500}!`);
    });
});