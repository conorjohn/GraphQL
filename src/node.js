'use strict';

const {nodeDefinitions, fromGlobalId} = require('relay');
const{
	GraphQLInterfaceType,
	GraphQLNonNull,
	GraphQLID
} = require('graphql');
const {getObjectById} = require('./data');
const {nodeInterface, nodeField} = nodeDefinitions(
	(globalId) => {
		const {type, id} = fromGlobalId(globalId);
		return getObjectById(type, id);
	}, 
	(object) => {
		if(object.title){
			return videoType;
		}
			return	null;
		
	});
const {videoType} = require('../');

// const nodeInterface = new GraphQLInterfaceType({
// 	name: 'Node',
// 	fields:{
// 		id: {
// 			type: new GraphQLNonNull(GraphQLID),
// 		},
// 	},
// 	resolveType: (object) => {
// 		if(object.title){
// 			return videoType;
// 		}
// 		return	null;
// 	},
// });

// module.exports = nodeInterface;

exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;