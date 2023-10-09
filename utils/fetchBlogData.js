const axios = require('axios');

const fetchBlogData = async () => {
  try {
    const response = await axios(
      {
        url:'/api/rest/blogs',
        method:'get',
        baseURL: 'https://intent-kit-16.hasura.app',
        headers: {
          'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
        }
      }
    );
    return response.data.blogs;
  } catch (error) {
    throw new Error('Error fetching blog data', error);
  }
};

module.exports = fetchBlogData;
