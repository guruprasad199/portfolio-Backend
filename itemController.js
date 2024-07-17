const Item = require('./Item');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs



// Get all items
exports.getData = async (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Error reading file' });
            return;
        }
        res.json(JSON.parse(data));
    });
};


// Add a new item
exports.postData = async (req, res) => {
    const newItem = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        date: new Date().toISOString()
    };

    fs.readFile('data.json', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Error reading file' });
            return;
        }
        let items = JSON.parse(data);
        items.push(newItem);
        fs.writeFile('data.json', JSON.stringify(items, null, 2), (err) => {
            if (err) {
                res.status(500).json({ message: 'Error writing file' });
                return;
            }
            res.status(201).json(newItem);
        });
    });
};



// Get a single item by ID
exports.getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an item
exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        item.name = req.body.name || item.name;
        item.description = req.body.description || item.description;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an item
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await item.remove();
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
