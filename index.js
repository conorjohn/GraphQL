'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {getVideoById, getVideos} = require('./src/data');

//setting up express
const PORT = process.env.PORT || 3000;
const server = express();

//Attempting to figure out how to add an Array into the returned results from the database
 
// const videoActorArray = new GraphQLObjectType({
//   name: 'actors',
//   fields: {
//     name: 
//   }
// })

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
    // actors: {
    //   type: new GraphQLList(videoActorArray),
    //   description: 'Actors and actresses in the video'
    // }
  }
})

const queryType = new GraphQLObjectType({
  name:'QueryType',
  description: 'The root query type',
  fields: {
    //this allows me to return array of videos
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos //can also be written as () => getVideos()
    },
    video:{
      type: videoType,
      args: {
        id: {
          //instead of just delcaring a type, this defines the required type
          type:new GraphQLNonNull(GraphQLID),
          description: 'The id of the video.',
        },
      },
        resolve: (_, args) => {
          return getVideoById(args.id);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType,
});

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

server.listen(PORT, (PORT) => {
  console.log(PORT);
  console.log('listening on http://localhost:${PORT}');
});

