const typeDefs = "#graphql\n  scalar Upload\n\n  type Mutation {\n    createPost(\n      title: String!,\n      caption: String!,\n      photos: [Upload]!,\n      landId: Int!,\n      isPublic: Boolean!,\n      isPublished: Boolean!\n    ): MutationResponse!\n  }\n\n";
export default typeDefs;