const { gql, ApolloServer } = require('apollo-server');

let books = [
    { id: "1", title: "V for Vendetta", author: "Allan Moore" },
    { id: "2", title: "O Último Desejo", author: "Andrzej Sapkowski" }
];

const typeDefs = gql`
    type Book {
        id: ID!
        title: String
        author: String
    }

    type Query {
        books: [Book]
        book(id: ID!): Book
    }
    
    type Mutation {
        create(id: ID!, title: String!, author: String!): Book
        delete(id: ID!): Boolean
        update(id: ID!, title: String, author: String): Book
    }
`;

const resolvers = {
    Query: {
       books: () => {
           return books;
       },
       book: (_, { id }) => {
           return books.find(book => book.id === id);
       }
    },
    Mutation: {
        create: (_, { id, title, author }) => {
            const book = { id, title, author };
            books.push(book);
            return book;
        },
        delete: (_, { id }) => {
            const filteredBooks = books.filter(book => book.id !== id);
            books = filteredBooks;
            return true;
        },
        update: (_, { id, title, author }) => {
            const book = books.find(book => book.id === id);
            book.title = title ? title : book.title;
            book.author = author ? author : book.author;
            return book;
        }
    }
}

const app = new ApolloServer({ typeDefs, resolvers });
app.listen().then(({ url }) => console.log(`Server running on ${url}`));