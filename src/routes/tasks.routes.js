import { Router } from 'express';
const router = Router();

// Database connection
import { connect } from '../database';
import { ObjectID } from 'mongodb';

router.get('/', async (req, res) => {

  const outset = req.query.outset ?? 0;
  const limit = req.query.limit ?? 20;

  const query = {};
  const options = {};

  try {
    const db = await connect();
    const collection = db.collection('tasks');

    const tasks = await collection
      .find(query, options)
      .skip(outset)
      .limit(limit)
      .toArray();

    res.json(tasks);
  } catch(e) {
    
    res
      .status(500)
      .json({
        error: "Error trying to get tasks"
    });

  }
});

router.get('/:id', async (req, res) => {

  const { id } = req.params;

  try {
    const db = await connect();
    const collection = db.collection('tasks');

    const result = await collection.findOne({ _id: ObjectID(id) });

    res.json(result);
  } catch(e) {
    
    console.error(e)

    res
      .status(500)
      .json({
        error: "Error trying to get the task"
    });

  }
});

router.post('/', async (req, res) => {

  const task = {
    title: req.body.title,
    description: req.body.description
  }  

  try {
    const db = await connect();
    const collection = db.collection('tasks');

    const { ops: result } = await collection.insertOne(task);

    res.json(result[0]);
  } catch(e) {
    
    console.error(e)

    res
      .status(500)
      .json({
        error: "Error trying to create task"
    });

  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateTask = {
    title: req.body.title,
    description: req.body.description
  }

  try {
    const db = await connect();
    const collection = db.collection('tasks');

    const result = await collection.findOneAndUpdate({ _id: ObjectID(id) }, { $set: updateTask });

    res.json({
      message: `Task ${id} updated`,
      result
    })
  } catch(e) {

    console.error(e);

    res
      .status(500)
      .json({
      error: 'Error trying to update the task'
    });
  }
});


router.delete('/:id', async (req, res) => {
  
  const { id } = req.params;

  try {
    const db = await connect();
    const collection = db.collection('tasks');

    const { result } = await collection.deleteOne({ _id: ObjectID(id) });

    res.json({
      message: `Task ${id} deleted`,
      result
    });
  } catch(e) {

    console.error(e);

    res
      .status(500)
      .json({
        error: 'Error trying to delete the task'
      })
  }

});

export default router;
