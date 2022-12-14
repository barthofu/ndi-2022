import type { NextPage } from 'next'

import { Box, Center, Circle, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { FaChild } from 'react-icons/fa'
import { BsGenderMale } from 'react-icons/bs'
import AnalysisRecapItem from '@components/shared/AnalysisRecapItem'
import { useStorage } from '@core/hooks'
import Link from 'next/link'
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
			<SimpleGrid 
				columns={{base: 2, md: 3}}
				maxW='1300px'
				padding={"20px"}
				paddingBottom='40px !important'
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
						<Text fontSize={12} fontWeight="300" paddingTop={"5px"}>*jeu généré par IA</Text>
						<Box marginTop={"180px"}>
							<Link href="/1">
								<Circle size='120px' bg='#ffb0af' color='white' style={{"cursor": "pointer"}}>
									<Flex direction={"column"}>
										<Text marginLeft={"35%"} color='black' fontSize={"25px"} w="200px" fontWeight={500}>{"Jouer au quizz"}</Text>
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
						<img src="/assets/condom.png" alt="condom" style={{ width: "80%" }}/>
					</picture>
				</Center>
				<Box w={{base: "100vw", md: "100%"}} paddingTop={{base: "120px", md: "50px"}} paddingBottom="50px">
					<AnalysisRecapItem title="60 ans" subtitle="l'âge le plus informé" icon={FaChild}/>
					<Box h="20px"/>
					<AnalysisRecapItem title="Homme" subtitle="genre le plus informé" icon={BsGenderMale}/>
					<Box h="10px"/>
					<Text fontSize={"12px"}><Link href={'/statistiques'}>Voir plus de statistiques...</Link></Text>
				</Box>
			</SimpleGrid>
		</DefaultLayout>
	</>)
}

export default HomePage