/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  redirects: async () => {
    return [{
      source: "/",
      destination: "/post/list",
      permanent: false
    }]
  }
}

module.exports = nextConfig
