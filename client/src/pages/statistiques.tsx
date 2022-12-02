import type { NextPage } from 'next'

import { Text, Box, SimpleGrid } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import React from 'react'

const StatsPage: NextPage = () => {

	return (<>

		<DefaultLayout
			title='Statistiques'
		>
			<SimpleGrid 
				columns={{base: 2, md: 3}}
				maxW='1300px'
				padding={"20px"}
				paddingTop={{base: '5px', md: '20px'}}
				spacing='10px'
				height="90vh"
				marginRight="auto"
				marginLeft="auto">
				<Box paddingTop="90px">
					<Box w='80%'>
						<picture style={{ objectFit: 'cover' }}>
							<source
								srcSet={"/assets/logo.webp"}
								type="image/webp"
							/>
							<img src="/assets/logo.png" alt="logo" />
						</picture>
					</Box>
					<Text fontSize={15} fontWeight="600" paddingTop={"30px"}>Statistiques.</Text>
				</Box>
			</SimpleGrid>
		</DefaultLayout>
	</>)
}

export default StatsPage