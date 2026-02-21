const Resource = require('../models/Resource');

// @desc    Get all resources with filters (Sem, Type, Search)
// @route   GET /api/resources
const getResources = async (req, res) => {
  try {
    const { semester, type, search } = req.query;
    let query = {};

    // 1. Filter by Semester (if selected)
    if (semester) {
      query.semester = semester;
    }

    // 2. Filter by Type (Note, PYQ, etc.)
    if (type) {
      query.type = type;
    }

    // 3. Search Logic (Fuzzy Search for Title or Subject)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } }, // 'i' makes it case-insensitive
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const resources = await Resource.find(query).sort({ createdAt: -1 });
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Could not fetch resources", error: error.message });
  }
};

// @desc    Add a new resource (You can use this for your Admin uploads)
// @route   POST /api/resources
const addResource = async (req, res) => {
  try {
    const newResource = new Resource(req.body);
    const savedResource = await newResource.save();
    res.status(201).json(savedResource);
  } catch (error) {
    res.status(400).json({ message: "Validation Error", error: error.message });
  }
};

module.exports = { getResources, addResource };