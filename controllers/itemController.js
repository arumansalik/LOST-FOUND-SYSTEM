const db = require("../config/db");

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

module.exports = { createItem };