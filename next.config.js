// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  output: 'export'
};

module.exports = {
  ...nextConfig,
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-generator' : '',
  // Autres configurations Next.js
};











//   /** @type {import('next').NextConfig} */
//   const nextConfig = {
//     images:{
//         unoptimized: true
//     },
//     output: 'export'
// };

// module.exports = nextConfig
