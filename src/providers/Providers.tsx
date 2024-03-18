import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { ReactNode, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { WagmiProvider } from 'wagmi';
import { theme } from '../assets/theme';
import { ErrorFallback } from '../components/ui/utils/ErrorFallback';
import graphQLClient from '../graphql';
import { FractalErrorBoundary, initErrorLogging } from '../helpers/errorLogging';
import { AppProvider } from './App/AppProvider';
import EthersContextProvider from './Ethers';
import { NetworkConfigProvider } from './NetworkConfig/NetworkConfigProvider';
import { wagmiConfig, walletConnectProjectId, queryClient } from './NetworkConfig/web3-modal.config';

if (walletConnectProjectId) {
  createWeb3Modal({ wagmiConfig, projectId: walletConnectProjectId });
}

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    initErrorLogging();
  }, []);

  return (
    <ChakraProvider
      theme={theme}
      resetCSS
    >
      <FractalErrorBoundary fallback={<ErrorFallback />}>
        <ApolloProvider client={graphQLClient}>
          <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <NetworkConfigProvider>
              <EthersContextProvider>
                <AppProvider>
                  <ToastContainer
                    position="bottom-center"
                    closeButton={false}
                    newestOnTop={false}
                    pauseOnFocusLoss={false}
                  />
                  {children}
                </AppProvider>
              </EthersContextProvider>
            </NetworkConfigProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </ApolloProvider>
      </FractalErrorBoundary>
    </ChakraProvider>
  );
}
