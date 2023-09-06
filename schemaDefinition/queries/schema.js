import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} from 'graphql';
import _ from 'lodash'
const pokemonDimension = [
    {id:"0001" , maximum: '2', minimum: '0.8'},
    {id:"0004", maximum: '1.0',minimum: '0.6'},
    {id:"0007" , maximum: '1.2',minimum: '0.5'}
]
const attack = [
    {id:"0001" , name: 'Vine Whip',type: 'grass', damage:'45'},
    {id:"0004", name: 'Ember',type: 'fire', damage:'40'},
    {id:"0007" , name: 'Tackle',type: 'normal', damage:'40'}
]

const PokemonDimension = new GraphQLObjectType({
    name:'PokemonDimension',
    fields:()=>({
        id:{type:GraphQLID},
        maximum :{type:GraphQLString},
        minimum: {type:GraphQLString}
    })
})

const Attack = new GraphQLObjectType({
    name:'Attack',
    fields:()=> ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        type:{type:GraphQLString},
        damage:{type:GraphQLString}
    })
})
const PokemonEvolutionRequirement = new GraphQLObjectType({
    name:'PokemonEvolution',
    fields:()=>({
        amount:{type:GraphQLInt},
        name:{type:GraphQLString}
    })
})

const Pokemon = new GraphQLObjectType({
    name :"Pokemon",
    fields:()=>({
        id:{type: GraphQLNonNull(GraphQLObjectType)},
        number:{type:GraphQLString},
        name:{type:GraphQLString},
        weight:{type: new GraphQLObjectType(PokemonDimension)},
        height:{type: new GraphQLObjectType(PokemonDimension)},
        classification: new GraphQLList(GraphQLString)
        types : new GraphQLList(GraphQLString),
        resistant: new GraphQLList(GraphQLString),
        weaknesses: new GraphQLList(GraphQLString),
        fleeRate: {type:GraphQLInt},
        maxCP:{type:GraphQLInt},
        maxHP:{type:GraphQLInt},
        image:{type:GraphQLString},
        evolutionRequirements: {type:new GraphQLObjectType(PokemonEvolutionRequirement)}
    })

})
const PokemonAttack = new GraphQLObjectType({
    name: "PokemonAttack",
    fields:()=>({
        fast: { type: new GraphQLList(Attack),
        resolve(parent, args){
            return _.find(attack, {id:args.id})
        }
        },
        special: {
            type: new GraphQLList(Attack),
            resolve(parent, args) {
                return _.find(attack, {id: args.id})
            }
        }
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
        },
        Attack:{
            type:Attack,
            args:{id:{type:GraphQLString}},
            resolve(parent, args){
                return _.find(attack,{id:args.id})
            }
        },
        PokemonEvolutionRequirement:{
            type: PokemonEvolutionRequirement,
            args:{id:{type:GraphQLString}},
            resolve(parent, args){
                //return _.find(attack,{id:args.id})
            }
        },
        pokemonAttack:{
            type: PokemonAttack,
            args:{id:{type:GraphQLString}},
            resolve(parent, args){
                return parent
            }
        }
    }
})

const schema = new GraphQLSchema({
   query:RootQuery
});

export  {schema}
