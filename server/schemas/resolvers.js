const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user.id })
                .select('-__v -password')
                .populate('savedBooks');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const saveList = await User.findOneAndUpdate(
                    { id: context.user_id },
                    { $addToSet: { savedBooks: args } },
                    { new: true, runValidators: true }
                );
                return saveList;
            }
            throw new AuthenticationError('You need to be logged in to save a book!')
        },
        deleteBook: async (parents, args, context) => {
            if (context.user) {
                console.log(context.user);
                const saveList = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                )
                return saveList;
            }
            throw new AuthenticationError('You need to be logged in to remove a book!')
        }


    }
}

module.exports = resolvers;
