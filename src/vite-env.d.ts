// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_GIT_HASH: string;

  readonly VITE_APP_ALCHEMY_MAINNET_API_KEY: string;
  readonly VITE_APP_ALCHEMY_SEPOLIA_API_KEY: string;
  readonly VITE_APP_ETHERSCAN_API_KEY: string;

  readonly VITE_APP_INFURA_IPFS_API_KEY: string;
  readonly VITE_APP_INFURA_IPFS_API_SECRET: string;
  readonly VITE_APP_SENTRY_DSN_URL: string;
  readonly VITE_APP_SHUTTER_EON_PUBKEY: string;

  readonly VITE_APP_SITE_URL: string;
  readonly VITE_APP_WALLET_CONNECT_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
