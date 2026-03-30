const db = require("../config/db");

const getItems = (req, res) => {
    const {type} = req.query;

    let query = "SELECT * FROM items";

    if(type) {
        query += " WHERE type = ?";
    }

    query += " ORDER BY created_at DESC";

    db.query(query, type ? [type]: [], (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).json({ error: "Database error"});
        }
        res.json(result);
    })
}
const getItemById = (req, res) => {
    const { id } = req.params;

    const query = "SELECT * FROM items WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if(err) {
            return res.status(500).json({ error: "Database error"});
        }

        if(result.length === 0) {
            return res.status(404).json({ error: "Not Found" });
        }
        res.json(result[0]);
    })
}

const createItem = (req, res) => {
    const {
        title,
        description,
        category,
        type,
        location,
        date,
        image_url,
        contact_info,
        user_id
    } = req.body;

    const query = `
    INSERT INTO items 
    (title, description, category, type, location, date, image_url, contact_info, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(
        query,
        [title, description, category, type, location, date, image_url, contact_info, user_id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            }

            res.status(201).json({
                message: "Item added successfully",
                itemId: result.insertId
            });
        }
    );
}

module.exports = { createItem, getItems, getItemById };