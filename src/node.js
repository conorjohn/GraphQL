'use strict';

const {nodeDefinitions, fromGlobalId} = require('graphql-relay');
const{
	GraphQLInterfaceType,
	GraphQLNonNull,
	GraphQLID
} = require('graphql');
const {getObjectById} = require('./data');
const {nodeInterface, nodeField} = nodeDefinitions(
	(globalId) => {
		const {type, id} = fromGlobalId(globalId)
		return getObjectById(type, id)
	}, 
	(object) => {

	})
const {videoType} = require('../');

const nodeInterface = new GraphQLInterfaceType({
	name: 'Node',
	fields:{
		id: {
			type: new GraphQLNonNull(GraphQLID),
		},
	},
	resolveType: (object) => {
		if(object.title){
			return videoType;
		}
		return	null;
	},
});

module.exports = nodeInterface;