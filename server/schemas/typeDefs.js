import { gql } from ('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
}

type Book {
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
}

type newBook {
    authors: [String]
    description: String
    title: String
    imageLink: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(_id: ID!, authors: [String], description: String, bookId: ID): User
    deleteBook(bookId: ID!): User
}
`

module.exports = typeDefs;