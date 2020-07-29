const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

const Workers = require('../models/worker');
const Tanks = require('../models/tank');

const WorkerType = new GraphQLObjectType({
    name: 'Worker',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        firstName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        secondName: {
            type: GraphQLString,
        },
        lastName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        tank: {
            type: TankType,
            resolve(parent, args){
                return parent.tankId ? Tanks.findById(parent.tankId): null;
            }
        }
    }),
});

const TankType = new GraphQLObjectType({
    name: 'Tank',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        model: {
            type: new GraphQLNonNull(GraphQLString),
        },
        className: {
            type: new GraphQLNonNull(GraphQLString),
        },
        nation: {
            type: new GraphQLNonNull(GraphQLString),
        },
        // worker: {
        //     type: GraphQLString,
        // }
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        workers: {
            type: new GraphQLList(WorkerType),
            resolve(parent, args){
                return Workers.find({})
            }
        },
        worker: {
            type: WorkerType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Workers.findById(args.id);
            }
        },
        workerByFirstName: {
            type: new GraphQLList(WorkerType),
            args: {
                firstName: {
                    type: GraphQLString
                }
            },
            resolve(parent, args){
                return Workers.find({
                    firstName: args.firstName,
                })
            }
        },
        workerByFirstNameSimple: {
            type: WorkerType,
            args: {name: {type: GraphQLString}},
            resolve(parent, args){
                return Workers.findOne({
                    firstName: args.name,
                })
            }
        },
        tanks: {
            type: new GraphQLList(TankType),
            resolve(parent, args){
                return Tanks.find({})
            }
        },
        tank: {
            type: TankType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Tanks.findById(args.id)
            }
        },
        tankByClassName: {
            type: new GraphQLList(TankType),
            args: {className: {type: GraphQLString}},
            resolve(parent, args){
                return Tanks.find({
                    className: args.className,
                })
            }
        },
        tankByModel: {
            type: new GraphQLList(TankType),
            args: {model: {type: GraphQLString}},
            resolve(parent, args){
                return Tanks.find({
                    model: args.model,
                })
            }
        },
        tankByNation: {
            type: new GraphQLList(TankType),
            args: {nation: {type: GraphQLString}},
            resolve(parent, args){
                return Tanks.find({
                    nation: args.nation,
                })
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addWorker: {
            type: WorkerType,
            args: {
                firstName: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                secondName: {
                    type: GraphQLString,
                },
                lastName: {
                    type: new GraphQLNonNull(GraphQLString),
                },
            },
            resolve(parent, args){
                const worker = new Workers({
                    firstName: args.firstName,
                    secondName: args.secondName,
                    lastName: args.lastName,
                });

                return worker.save();
            },
        },
        updateWorker: {
            type: WorkerType,
            args: {
                id: {
                    type: GraphQLID,
                },
                firstName: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                secondName: {
                    type: GraphQLString,
                },
                lastName: {
                    type: new GraphQLNonNull(GraphQLString),
                },
            },
            resolve(parent, args){
                return Workers.findByIdAndUpdate( args.id,
                    {
                        $set: {
                            firstName: args.firstName,
                            secondName: args.secondName,
                            lastName: args.lastName,
                        }
                    },
                    {
                        new: true,
                    })
            }
        },
        removeWorker: {
            type: WorkerType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args){
                return Workers.findByIdAndRemove(args.id);
            }
        },
        addTank: {
            type: TankType,
            args: {
                model: {
                    type: GraphQLString,
                },
                className: {
                    type: GraphQLString,
                },
                nation: {
                    type: GraphQLString,
                },
            },
            resolve(parent, args){
                const tank = new Tanks({
                    model: args.model,
                    className: args.className,
                    nation: args.nation,
                });

                return tank.save();
            },
        },
        updateTank: {
            type: TankType,
            args: {
                id: {
                    type: GraphQLID,
                },
                model: {
                    type: GraphQLString,
                },
                className: {
                    type: GraphQLString,
                },
                nation: {
                    type: GraphQLString,
                },
            },
            resolve(parent, args){
                return Tanks.findByIdAndUpdate( args.id,
                    {
                        $set: {
                            model: args.model,
                            className: args.className,
                            nation: args.nation,
                        }
                    },
                    {
                        new: true,
                    })
            }
        },
        removeTank: {
            type: TankType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args){
                return Tanks.findByIdAndRemove(args.id);
            }
        },
    },
});



module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
