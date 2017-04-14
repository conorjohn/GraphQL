'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {getVideoById, getVideos, createVideo } = require('./src/data');

const {globalIdField} = require('graphql-relay');
const {nodeInterface, nodeField} = require('./src/node');

//setting up express
const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on egghead',
  fields: {
    id: globalIdField(),
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
    },
  },
  interfaces: [nodeInterface],
})


const queryType = new GraphQLObjectType({
  name:'QueryType',
  description: 'The root query type',
  fields: {
    node: nodeField,
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
const videoInputType = new GraphQLInputObjectType({
  name: 'VideoInput',
  fields: {
    title:{
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the video.',
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The duration of the video in seconds',
    },
    released: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether or not the video is released',
    },
  }
})
const mutationType   = new GraphQLObjectType ({
  name: 'Mutation',
  description: 'The root Mutation type.',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        video: {
          type: new GraphQLNonNull(videoInputType),

        }
      },
      resolve: (_, args) => {
        return createVideo(args.video);
      },
    },
  },
})
exports.videoType = videoType;

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true,
}));

server.listen(PORT, (PORT) => {
  console.log('listening on http://localhost:'+PORT);
});

