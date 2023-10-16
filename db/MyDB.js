import { query } from "express";
import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const connection_url = process.env.MONGO_URL;
//const DB_name = "books";
const MyDB = () => {
  const myDB = {};

  const connect = () => {
    const client = new MongoClient(connection_url);
    console.log(`thi is a connection url: ${connection_url}`);
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

  myDB.getSearch = async ({ query = {}, MaxElements = 20, page = 1 } = {}) => {
    const { client, db } = connect();
    const bookCollection = db.collection("books");

    try {
      const skip = (page - 1) * MaxElements;
      console.log(`this is a skip value:${skip}`);
      return await bookCollection
        .find(query)
        .skip(skip)
        .limit(MaxElements)
        .toArray();
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
