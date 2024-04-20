const connection = require("../config/db");
const { MY_DB } = require("../config/env");

const goalTable = async () => {
  try {
    // Switch to the created database
    await connection.query(`USE ${MY_DB};`);
    console.log(`Switched to ${MY_DB}`);
    // Create goals_table table if it doesn't exist
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS goals_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        targetDate DATE,
        achieved BOOLEAN
      );
    `;

    await connection.query(createTableSql);
    console.log("goals_table table created or successfully checked");
  } catch (error) {
    console.error("Error occurred:", error.message);
    throw error;
  }
};

// Create table
goalTable();

const listAllGoals = async () => {
  const [rows] = await connection.query("SELECT * FROM goals_table");
  return rows;
};

const findGoalById = async (id) => {
  const [rows] = await connection.execute(
    "SELECT * FROM goals_table WHERE id = ?",
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addOneGoal = async (goal) => {
  const { title, description, targetDate, achieved } = goal;

  const sql = `INSERT INTO goals_table (title, description, targetDate, achieved)
               VALUES (?, ?, ?, ?)`;

  const params = [title, description, targetDate, achieved];

  const rows = await connection.execute(sql, params);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { goal_id: rows[0].insertId };
};

// connection.format: This is a method provided by the mysql2 package that helps format SQL queries with values safely. It replaces placeholders (?) in the SQL string with the values provided in the array.
// const modifyGoal = async (goal, id) => {
//   let sql = connection.format(`UPDATE goals_table SET ? WHERE id = ?`, [
//     goal,
//     id,
//   ]);

//   const rows = await connection.execute(sql);
//   if (rows[0].affectedRows === 0) {
//     return false;
//   }
//   return { message: "success" };
// };

const modifyGoal = async (goal, id) => {
  const sql = "UPDATE goals_table SET ? WHERE id = ?";
  const [rows] = await connection.execute(sql, [goal, id]);
  
  if (rows.affectedRows === 0) {
    return false;
  }
  return { message: "success" };
};

const removeGoal = async (id) => {
  let sql = "DELETE FROM goals_table WHERE id = ?";
  const [rows] = await connection.execute(sql, [id]);

  if (rows.affectedRows === 0) {
    return false;
  }
  return { message: "success" };
};

module.exports = {
  listAllGoals,
  findGoalById,
  addOneGoal,
  modifyGoal,
  removeGoal,
};
