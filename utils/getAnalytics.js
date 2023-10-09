const _ = require('lodash');

const analyticsMiddleware = (blogs) => {
  const data = blogs;

  // Perform analytics on 'data'
  const totalBlogs = data.length;
  const titleOfLongestBlog = _.maxBy(data , blog => blog.title.length).title;
  const blogsWithWordPrivacy = _.filter(data , blog => _.includes(blog.title.toLowerCase() , 'privacy'));
  const noOfBlogsWithWordPrivacy = _.size(blogsWithWordPrivacy);
  const uniqueBlogTitles = _.uniqBy(data , 'title').map(blog => blog.title);

  // Attach analytics to the request object for the client to access
  return {totalBlogs , titleOfLongestBlog,noOfBlogsWithWordPrivacy,uniqueBlogTitles};
};

module.exports = analyticsMiddleware;
