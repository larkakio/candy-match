/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Ігноруємо React Native модулі для MetaMask connector
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@react-native-async-storage/async-storage': false,
      'pino-pretty': false,
      canvas: false,
      gl: false,
      encoding: false, // node-fetch (via @solana/web3 -> @farcaster/miniapp-sdk) — не потрібен у браузері
    }

    // Виключаємо проблемні модулі з серверного бандлу (якщо потрібно)
    if (isServer) {
      config.externals = config.externals || []
    }

    return config
  },
}

module.exports = nextConfig
