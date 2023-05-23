/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, //https://github.com/vercel/next.js/issues/35822
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true, // Со временем привести все к тому, чтобы во время билда не было оошибок ESLint
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.module.rules.push({
  //     test: /\.js$/,
  //     exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,
  //     loader: 'babel-loader',
  //   });
  //
  //   config.plugins.push(
  //     new webpack.ProvidePlugin({
  //       'window.Quill': 'quill',
  //     }),
  //   );
  //
  //   return config;
  // },
};

module.exports = nextConfig;
