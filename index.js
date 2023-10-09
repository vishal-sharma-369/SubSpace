require("dotenv").config();
const express = require('express');
const cors = require("cors");
const fetchBlogData = require('./utils/fetchBlogData');
const memoizedFilterBlogs = require("./utils/filterBlogs")
const analyticsMiddleware = require('./utils/getAnalytics');

const app = express();
app.use(cors());

// Middleware to fetch blog data and make analytics
app.use("/api",async (req, res, next) => {
  try {
    const data = await fetchBlogData();
    req.apiResponse = data;
    req.dataAnalytics = analyticsMiddleware(data);
    next();
  } catch (error) {
    return res.status(500).send('Error fetching blog data');
  }
});

// Endpoint to get data analytics
app.get('/api/blog-stats', (req, res) => {
  return res.json(req.dataAnalytics);
});

// Endpoint for blog search
app.get('/api/blog-search', (req, res) => {
    const {query} = req.query;
    const blogs = req.apiResponse;
    const filteredBlogs = memoizedFilterBlogs(blogs , query);
    return res.status(200).json({data : filteredBlogs})
});

app.get("*" , (req , res)=>
{
  return res.redirect("/api/blog-stats");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
