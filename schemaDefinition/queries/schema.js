import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import _ from 'lodash'

/*//const pokemonDimension = [
    {id: "0001", maximum: '2', minimum: '0.8'},
    {id: "0004", maximum: '1.0', minimum: '0.6'},
    {id: "0007", maximum: '1.2', minimum: '0.5'}
]*/
/*
const attack = [
    {id: "0001", name: 'Vine Whip', type: 'grass', damage: '45'},
    {id: "0004", name: 'Ember', type: 'fire', damage: '40'},
    {id: "0007", name: 'Tackle', type: 'normal', damage: '40'}
]
*/

/*
const pokemonEvolution = [
    {id: "0001", amount: 123, name: 'grass'},
    {id: "0002", amount: 456, name: 'grass'},
]
*/

const PokemonDimension = new GraphQLObjectType({
    name: 'PokemonDimension',
    fields: () => ({
        id: {type: GraphQLID},
        maximum: {type: GraphQLString},
        minimum: {type: GraphQLString}
    })
})

const Attack = new GraphQLObjectType({
    name: 'Attack',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        damage: {type: GraphQLString}
    })
})
const PokemonEvolutionRequirement = new GraphQLObjectType({
    name: 'PokemonEvolution',
    fields: () => ({
        amount: {type: GraphQLInt},
        name: {type: GraphQLString}
    })
})

const Pokemon = new GraphQLObjectType({
    name: "Pokemon",
    fields: () => ({
        id: {type: GraphQLString},
        number: {type: GraphQLString},
        name: {type: GraphQLString},
        weight: {
            type: new GraphQLObjectType(PokemonDimension),
            resolve(parent, args) {
                return _.filter(pokemonDimension, {id: parent.id})

            }
        },
        height: {
            type: new GraphQLObjectType(PokemonDimension),
            resolve(parent, args) {
                return _.find(pokemonDimension, {id: parent.id})
            }

        },
        classification: new GraphQLList(GraphQLString),
        types: new GraphQLList(GraphQLString),
        resistant: new GraphQLList(GraphQLString),
        weaknesses: new GraphQLList(GraphQLString),
        fleeRate: {type: GraphQLInt},
        maxCP: {type: GraphQLInt},
        maxHP: {type: GraphQLInt},
        image: {type: GraphQLString},
        evolutionRequirements: {
            type: new GraphQLObjectType(PokemonEvolutionRequirement),
            resolve(parent, args) {
                return _.find(pokemonEvolution, {id: parent.id})
            }
        }

    })
})
const PokemonAttack = new GraphQLObjectType({
    name: "PokemonAttack",
    fields: () => ({
        fast: {
            type: new GraphQLList(Attack),
            resolve(parent, args) {
                return _.filter(attack, {id: parent.id})

            }
        },
        special: {
            type: new GraphQLList(Attack),
            resolve(parent, args) {
                console.log(parent, 'parent')
                return _.filter(attack, {id: parent.id})
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
        Attack: {
            type: Attack,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return _.find(attack, {id: args.id})
            }
        },
        PokemonEvolutionRequirement: {
            type: PokemonEvolutionRequirement,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                //return _.find(attack,{id:args.id})
            }
        },
        pokemonAttack: {
            type: PokemonAttack,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return _.find(attack, {id: args.id})
            }
        },
        pokemons: {
            type: new GraphQLList(Pokemon),
            args: {id: GraphQLID},
            resolve(parent, args) {
                return
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addPokemon: {
            type: Pokemon,
            args: {
                id: {type: GraphQLString},
                number: {type: GraphQLString},
                name: {type: GraphQLString},
                weight: {
                    type: new GraphQLObjectType(PokemonDimension),
                    resolve(parent, args) {
                        return _.filter(pokemonDimension, {id: parent.id})

                    }
                },
                height: {
                    type: new GraphQLObjectType(PokemonDimension),
                    resolve(parent, args) {
                        return _.find(pokemonDimension, {id: parent.id})
                    }

                },
                classification: new GraphQLList(GraphQLString),
                types: new GraphQLList(GraphQLString),
                resistant: new GraphQLList(GraphQLString),
                weaknesses: new GraphQLList(GraphQLString),
                fleeRate: {type: GraphQLInt},
                maxCP: {type: GraphQLInt},
                maxHP: {type: GraphQLInt},
                image: {type: GraphQLString},
                evolutionRequirements: {
                    type: new GraphQLObjectType(PokemonEvolutionRequirement),
                    resolve(parent, args) {
                        return _.find(pokemonEvolution, {id: parent.id})
                    }
                },
                resolve(parentt, args) {
                    id:args.id,
                        number
                :
                    args.number,
                        name
                :
                    args.name,
                        weight
                :
                    {
                        minimum:args.weight.minimum,
                            maximum
                    :
                        args.weight.maximum
                    }
                ,
                    height:{
                        minimum:args.height.minimum,
                            maximum
                    :
                        args.height.maximum
                    }
                ,
                    classification:args.classification,
                        types
                :
                    args.types,
                        fleeRate
                :
                    args.fleeRate,
                        maxCP
                :
                    args.maxCP,
                        image
                :
                    args.image,
                        resistant
                :
                    args.resistant,
                        weaknesses
                :
                    args.weaknesses,
                        evolutionRequirements
                :
                    args.evolutionRequirements
                }
            }
        }
    }

})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

export {schema}
