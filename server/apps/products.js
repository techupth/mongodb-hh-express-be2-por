import { Router } from "express";
import  { connectDatabase, db } from "../utils/db.js"
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
    try {
        //select database
        const collection = db.collection('practice-mongo');
        
        //get all collection
        const result = await collection.find({}).toArray();
        
        return res.status(200).json({data: result})

    } catch(error) {
        return res.status(500).json({
            message: 'Cannot get collection from database due to database connection problem',
            error: error.message
        });
    }
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
    try {
        //select database name that want to work with
        const collection = db.collection('practice-mongo');

        //assign request body into variable and insert into mongodb
        const newProduct = {...req.body};
        await collection.insertOne(newProduct);
    } catch (error) {
        return res.status(500).json({
            message: 'Server count not create new product because database connection problem',
            error: error.message
        });
    }
    //return response
    return res.status(201).json({
        message: 'Product has been created successfully'
    });
});

productRouter.put("/:id", async (req, res) => {
    try {
        const collection = db.collection('practice-mongo');
        //assign variable from endpoint
        const productId = req.params.id;

        //covert to object
        const objectId = new ObjectId(productId);
        
        //assign request body to variable
        const newProduct = {...req.body};

        //perform update
        const updateResult = await collection.updateOne(
            { _id: objectId},
            {$set: newProduct}
        );

        return res.status(200).json({
            message: 'Product has been updated successfull',
            result: updateResult
        });
    } catch (error) {
        return res.status(500).json({
            message: 'can not update data due to database connection',
            error: error.message
        });
    }
});

productRouter.delete("/:id", async (req, res) => {
    try {
        const collection = db.collection('practice-mongo');
        //get id from end-point
        const deleteId = req.params.id;
        //convert object
        const objectId = new ObjectId(deleteId);
        //perform delete
        await collection.deleteOne({
            _id: objectId
        });

    } catch (error) {
        return res.status(500).json({
            message: 'can not delete data due to database connection',
            error: error.message
        });
    }

    return res.status(200).json({
        message: 'Product has been deleted successfully'
    });
});

export default productRouter;
