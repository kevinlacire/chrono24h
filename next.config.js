// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH || '/chrono24h',
}
 
module.exports = nextConfig
