const _ = require("lodash")

function filterBlogs(blogs,query)
{
    return blogs.filter(blog => blog.title.toLowerCase().includes(query.toLowerCase()));
}

const memoizedFilterBlogs = _.memoize(filterBlogs);

module.exports = _.memoize(filterBlogs);