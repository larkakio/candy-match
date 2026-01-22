import { base } from 'wagmi/chains'
import { createConfig, http } from 'wagmi'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    // MetaMask та WalletConnect вимкнені через проблеми з залежностями
    // Можна додати пізніше після налаштування
  ],
  transports: {
    [base.id]: http(),
  },
})
