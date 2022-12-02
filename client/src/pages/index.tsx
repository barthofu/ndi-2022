import { trpc } from '@lib/trpc'
import type { NextPage } from 'next'

import { Button, Center, Grid, GridItem, Text, Flex, Spacer, Box, Circle, SimpleGrid } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { FaChild } from 'react-icons/fa'
import { GoLocation } from 'react-icons/go'
import AnalysisRecapItem from '@components/shared/AnalysisRecapItem'
import Link from 'next/link'
import { useStorage } from '@core/hooks'
import { useEffect } from 'react'

const HomePage: NextPage = () => {

	const { setItem } = useStorage()

	useEffect(() => {
		setItem('score', '50')
	}, [])

	return (<>

		<DefaultLayout
			title='Evite le VIH'
		>
			<Button 
				as='a'
				href='/1'
			/>
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
						<Text fontSize={15} fontWeight="600" paddingTop={"30px"}>Afin de sensibiliser les personnes à la question du VIH/sida, EVITE LE VIH lance une étude statistique de prévention. Jouez pour en savoir plus.</Text>
						<Box marginTop={"180px"}>
							<Link href="/1">
								<Circle size='120px' bg='#ffb0af' color='white' style={{"cursor": "pointer"}}>
									<Flex direction={"column"}>
										<Text marginLeft={"45%"} color='black' fontSize={"25px"} w="200px" fontWeight={500}>{"Suis-je prêt"}</Text>
										<Text marginLeft={"45%"} color='black' fontSize={"25px"} w="200px" fontWeight={500}>{"à l'éviter ?"}</Text>
									</Flex>
								</Circle>
							</Link>
						</Box>
				</Box>
				<Center h="100%">
					<picture style={{ objectFit: 'cover', width: "100%", maxWidth: "300px" }}>
						<source
							srcSet={"/assets/condom.webp"}
							type="image/webp"
						/>
						<img src="/assets/condom.png" alt="condom" style={{ width: "100%" }}/>
					</picture>
				</Center>
				<Box w={{base: "100vw", md: "100%"}} paddingTop={{base: "120px", md: "50px"}} paddingBottom="50px">
					<AnalysisRecapItem title="18 ans" subtitle="l'âge le plus (prévenu)" icon={FaChild}/>
					<Box h="20px"/>
					<AnalysisRecapItem title="Lyon" subtitle="ville la plus (prévenu)" icon={GoLocation}/>
					<Box h="10px"/>
					<Text fontSize={"12px"}><Link href={'/statistiques'}>Voir plus de statistiques...</Link></Text>
				</Box>
			</SimpleGrid>
		</DefaultLayout>
	</>)
}

export default HomePage