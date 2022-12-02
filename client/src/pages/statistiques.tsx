import type { NextPage } from 'next'
import { Text, Box, Flex, Center } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import React, { useMemo } from 'react'
import { trpc } from '../core/utils/lib'
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer, Bar, BarChart, Legend, Tooltip } from 'recharts';
import dynamic from 'next/dynamic'

const StatsPage: NextPage = () => {

	const { data, error } = trpc.stat.getStats.useQuery();

	const genreMappedData = useMemo(() => {
		const men = data ? data.filter(person => person.genre === 'Homme') : [];
		const women = data ? data.filter(person => person.genre === 'Femme') : [];
		const other = data ? data.filter(person => person.genre === 'Autre') : [];

		const averageMen = men.reduce((total, next) => total + next.score, 0) / men.length;
		const averageWomen = women.reduce((total, next) => total + next.score, 0) / women.length;
		const averageOther = other.reduce((total, next) => total + next.score, 0) / other.length;


		return data ? [{genre: "Homme", score: averageMen}, {genre: "Femme", score: averageWomen}, {genre: "Autre", score: averageOther}] : [];
	}, [data]);

	const sortDataByAge = useMemo(() => data?.sort((a, b) => a.age - b.age), [data]); 

	const Charts = dynamic(() => Promise.resolve(() => <>
	<LineChart width={500} height={300} data={sortDataByAge}>
			<XAxis dataKey="age"/>
			<YAxis/>
			<CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
			<Tooltip />
  		<Legend verticalAlign="top" height={36}/>
			<Line name="Score par âge" type="monotone" dataKey="score" stroke="#82ca9d" />
		</LineChart>
		<Box width={"50px"} />
		<BarChart width={500} height={500} data={genreMappedData}>
			<XAxis dataKey="genre" type="category" />
			<YAxis type='number' />
			<Bar name="Score par genre" dataKey="score" fill="#8884d8" />
  		<Legend verticalAlign="top" height={36}/>
		</BarChart>
		</>), {
		ssr: false
	})


	return (<>

		<DefaultLayout
			title='Envoi'
		>
			<Flex 
				maxW='1300px'
				padding={"20px"}
				paddingTop={{base: '5px', md: '20px'}}
				marginRight="auto"
        direction={"column"}
				marginLeft="auto">
				<Box w="300px" paddingTop="90px">
						<Box w='80%'>
							<a href="/">
								<picture style={{ objectFit: 'cover' }}>
									<source
										srcSet={"/assets/logo.webp"}
										type="image/webp"
									/>
									<img src="/assets/logo.png" alt="logo" />
								</picture>
							</a>
						</Box>
						<Text fontSize={15} fontWeight="600" paddingTop={"10px"}>Statistiques</Text>
				</Box>
        <Center paddingTop={"70px"}>
					{error && <Box>{error.message}</Box>}
					{!data && !error && <Box>Loading...</Box>}
					{data && <>
						<Charts/>
					</>}
      	</Center>
    </Flex>
  </DefaultLayout>
	</>)
}

export default StatsPage