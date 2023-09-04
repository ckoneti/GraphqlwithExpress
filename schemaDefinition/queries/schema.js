import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID} from 'graphql';
import _ from 'lodash'
const pokemonDimension = [
    {id:"1" , maximum: '56', minimum: '6'},
    {id:"2", maximum: '89',minimum: '9'},
    {id:"3" , maximum: '89',minimum: '8'}
]
const PokemonDimension = new GraphQLObjectType({
    name:'PokemonDimension',
    fields:()=>({
        id:{type:GraphQLID},
        maximum :{type:GraphQLString},
        minimum: {type:GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        pokemonDimension: {
            type: PokemonDimension,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return _.find(pokemonDimension, {id: args.id})
            }
        }
    }
})

const schema = new GraphQLSchema({
   query:RootQuery
});

export  {schema}