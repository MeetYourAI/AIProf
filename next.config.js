// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//       output: 'export',
//       appDir: true,
//     },
//   };
  
//   module.exports = nextConfig;
  


// When to deploying on the github pages.
module.exports = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/AiProf' : '',
};



