// Set up db connection here

import { mongoClient } from mongodb;

const connectionString = 'mongodb://127.0.0.1:27017';

export const client = new mongoClient(connectionString, {useUnifiedTopology: true});
export const db = client.db;

