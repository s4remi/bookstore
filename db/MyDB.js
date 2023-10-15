import { query } from "express";
import { MongoClient } from "mongodb";
//import * as dotenv from "dotenv";
//dotenv.config();

//const client = process.env.Mongo_Url;
const uri =
  "Monmongodb+srv://admin:admin@cluster0.duh9gcc.mongodb.net/?retryWrites=true&w=majority";
const DB_name = "books";

const MyD = () => {
  const myDB = {};
  const usersCollection = "users";

  const connect = () => {
    const client = new MongoClient(uri);
    const db = client.db("eCommer");
    return { client, db };
  };

  myDB.getUser = async (query = {}) => {
    const { client, db } = connect();
    const userCollection = db.collection("users");
    try {
      return userCollection.findOne(query);
    } catch (e) {
      await client.close();
    }
  };

  myDB.createUser = async (doc = {}) => {
    const { client, db } = connect();
    const userCollection = db.collection("users");
    try {
      return userCollection.insertOne(doc);
    } catch (e) {
      await client.close();
    }
  };

  myDB.getSearch = async ({ query = {}, MaxElements = 20 } = {}) => {
    const { client, db } = connect();
    const bookCollection = db.collection("books");
    //console.log("getSearch function", query);

    try {
      return await bookCollection.find(query).limit(MaxElements).toArray();
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  //filter the query by isbn

  myDB.getBookByISBN = async ({ query = {}, MaxElements = 2 }) => {
    const { client, db } = connect();
    const bookCollection = db.collection("books");
    console.log("in the mongodb object .js search for");
    console.log(query);
    try {
      return await bookCollection.find(query).limit(MaxElements).toArray();
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  return myDB;
};
export const myDB = MyDB();
