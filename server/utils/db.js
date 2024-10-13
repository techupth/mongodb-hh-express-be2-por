// Set up db connection here
import { MongoClient } from 'mongodb';

const connectionString = 'mongodb://127.0.0.1:27017';
const dbName = 'practice-mongo'

export let db;

export const client = new MongoClient(connectionString, {useUnifiedTopology: true});

export async function connectDatabase() {
    try {
        //connect to 
        await client.connect();
        console.log('successfully connected to mongoDB');

        //assign db object after connection successful
         db = client.db(dbName);
    } catch (error) {
        console.log('Error connecting to mongoDB', error);
        throw error;
    }
}
