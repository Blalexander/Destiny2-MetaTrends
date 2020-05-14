module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://testuser:testpassword@ds127015.mlab.com:27015/react-capstone',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  API_BASE_URL: process.env.API_URL || 'https://enigmatic-savannah-35083.herokuapp.com/',
  // API_BASE_URL: 'http://localhost:8080/'
}; 