'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');

//setting up express
const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'video',
  description: 'a video on egghead',
  fields: {
    id: {
      type: GraphQLID,
      description:'The id of the video'
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video'
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video in seconds'
    },
    watch: {
      type: GraphQLBoolean,
      description: 'Whether or not the viewer has watched the video'
    }
  }
})

const queryType = new GraphQLObjectType({
  name:'QueryType',
  description: 'The root query type',
  fields: {
    video:{
      type: videoType,
      resolve: () => new Promise((resolve) => {
        resolve({
          id: 'a',
          title: 'GraphQL',
          duration: 180,
          watched: false
        })
      })
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType,
});

const videoA = {
  id: 'a',
  title: 'Create a GraphQL Schema',
  duration: 120,
  watched: true
};

const videoB = {
  id: 'b',
  title: 'Angular CLI',
  duration: 240,
  watched: false
};

const videos = [videoA, videoB];

//resolver
// const resolvers = {
//   video: () => ({
//     id: '1',
//     title: 'bar',
//     duration: 180,
//     watched: true
//   }),
//   videos: () => videos
// };


server.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true,
}));

server.listen(PORT, () => {
  console.log('listening on http://localhost:${PORT}');
});

