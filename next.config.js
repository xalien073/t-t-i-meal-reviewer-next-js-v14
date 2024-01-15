/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

//edited
// next.config.js
// module.exports = {
//     nextConfig,
//     webpack: (config, { isServer }) => {
//       if (!isServer) {
//         config.resolve.alias['bootstrap'] = require.resolve('bootstrap');
//       }
//       return config;
//     },
//   };
  