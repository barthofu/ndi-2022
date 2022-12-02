import '@fontsource/open-sans/700.css'
import '@fontsource/raleway/400.css'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@core/theme'
import { trpc } from '@lib/trpc'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	
  	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default trpc.withTRPC(MyApp)
