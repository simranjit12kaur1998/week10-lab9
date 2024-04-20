const {
  listAllCats,
  findCatById,
  addOneCat,
  modifyCat,
  removeCat,
} = require("../models/catModel");

const getCats = async (req, res) => {
  res.json(await listAllCats());
};

const getCat = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const addCat = async (req, res) => {
  const result = await addOneCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({ message: "New cat added.", result });
  } else {
    res.sendStatus(400);
  }
};

const updateCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

module.exports = { getCats, getCat, addCat, updateCat, deleteCat };
