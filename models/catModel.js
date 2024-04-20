const connection = require("../config/db");
const { MY_DB } = require("../config/env");

const catTable = async () => {
  try {
    // Switch to the created database
    await connection.query(`USE ${MY_DB};`);
    console.log(`Switched to ${MY_DB}`);
    // Create cats_table table if it doesn't exist
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS cats_table (
        cat_id int(11) NOT NULL AUTO_INCREMENT,
        cat_name text NOT NULL,
        weight float NOT NULL,
        filename text NOT NULL,
        birthdate date DEFAULT NULL,
        PRIMARY KEY (cat_id)
      );
    `;

    await connection.query(createTableSql);
    console.log("cats_table table created or successfully checked");
  } catch (error) {
    console.error("Error occurred:", error.message);
    throw error;
  }
};

// Create table
catTable();

const listAllCats = async () => {
  const [rows] = await connection.query("SELECT * FROM cats_table");
  // console.log("rows", [...rows]);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await connection.execute(
    "SELECT * FROM cats_table WHERE cat_id = ?",
    [id]
  );
  // console.log("rows", rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addOneCat = async (cat) => {
  const { cat_name, weight, filename, birthdate } = cat;

  const sql = `INSERT INTO cats_table (cat_name, weight, filename, birthdate)
               VALUES (?, ?, ?, ?)`;

  const params = [cat_name, weight, filename, birthdate];
  // .map(
  //   (value) => {
  //     if (value === undefined) {
  //       return null;
  //     } else {
  //       return value;
  //     }
  //   }
  // );

  // console.log("params", params);
  const rows = await connection.execute(sql, params);
  // console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { cat_id: rows[0].insertId };
};

const modifyCat = async (cat, id) => {
  let sql = connection.format(`UPDATE cats_table SET ? WHERE cat_id = ?`, [
    cat,
    id,
  ]);

  const rows = await connection.execute(sql);
  // console.log("rows", rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { message: "success" };
};

const removeCat = async (id, user) => {
  let sql = connection.format(`DELETE FROM cats_table WHERE cat_id = ?`, [id]);

  const [rows] = await connection.execute(sql);
  // console.log("rows", rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return { message: "success" };
};

module.exports = { listAllCats, findCatById, addOneCat, modifyCat, removeCat };

// Clear the cats_table table
// await connection .query("DELETE FROM cats_table");
// console.log("cats_table table cleared successfully");

// Insert initial values into cats_table table
// const initialValues = [
//   ["Cat1", 5.5, "cat1.jpg", "2022-01-01"],
// ];

// const insertSql = `
//   INSERT INTO cats_table (cat_name, weight, filename, birthdate)
//   VALUES ?
// `;

// await connection .query(insertSql, [initialValues]);
// console.log("Initial values inserted into cats_table table");
