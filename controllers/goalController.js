const {
  listAllGoals,
  findGoalById,
  addOneGoal,
  modifyGoal,
  removeGoal,
} = require("../models/goalModel");

const getGoals = async (req, res) => {
  res.json(await listAllGoals());
};

const getGoal = async (req, res) => {
  const goal = await findGoalById(req.params.id);
  if (goal) {
    res.json(goal);
  } else {
    res.sendStatus(404);
  }
};

const addGoal = async (req, res) => {
  console.log('postGoal', req.body);

  const result = await addOneGoal(req.body);
  if (result.goal_id) {
    res.status(201);
    res.json({ message: "New goal added.", result });
  } else {
    res.sendStatus(400);
  }
};

const updateGoal = async (req, res) => {
  const result = await modifyGoal(req.body, req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

const deleteGoal = async (req, res) => {
  const result = await removeGoal(req.params.id);
  console.log("tes",req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};
 
module.exports = { getGoals, getGoal, addGoal, updateGoal, deleteGoal };
 