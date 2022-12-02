import { trpc } from '@lib/trpc'
import type { NextPage } from 'next'
import { useFormik } from "formik";

import { Center, Text, Flex, Box, FormLabel, Select, Spinner } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { useMemo } from 'react'
import Router from 'next/router'

const SendDataPage: NextPage = () => {

  const optionsAge = useMemo(() => {
    return Array.from(Array(100).keys()).map((data) => data >= 10 ? <option key={data} value={data}>{data}</option> : undefined)
  }, []);

  const statMutation = trpc.stat.createStat.useMutation();

  const formik = useFormik<{genre: Strapi.Stat["genre"] | undefined, age: string | undefined}>({
    initialValues: {genre: undefined, age: undefined},
    onSubmit: async (values) => {
      if(values.genre !== undefined && values.age !== undefined) {
        await statMutation.mutateAsync({genre: values.genre, age: parseInt(values.age), score: 18}).then(() => Router.push('/statistiques'))
      }
    },
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
							<picture style={{ objectFit: 'cover' }}>
								<source
									srcSet={"/assets/logo.webp"}
									type="image/webp"
								/>
								<img src="/assets/logo.png" alt="logo" />
							</picture>
						</Box>
						<Text fontSize={15} fontWeight="600" paddingTop={"30px"}>Vous êtes informé à 50%.</Text>
						<Text fontSize={15} fontWeight="600" paddingTop={"10px"}>Envoyez vos données pour l'étude :</Text>
				</Box>
        <Center paddingTop={"70px"}>
          <form style={{"width": "400px"}} onSubmit={formik.handleSubmit}>
            <FormLabel>Genre</FormLabel>
            <Select name='genre' placeholder='Choisir' onChange={formik.handleChange}>
              <option>Femme</option>
              <option>Homme</option>
              <option>Autre</option>
            </Select>
            <Box h="10px" />
            <FormLabel>Âge</FormLabel>
            <Select name='age' placeholder='Choisir' onChange={formik.handleChange}>
              {optionsAge}
            </Select>
            <Box h="20px" />
            <button style={{"backgroundColor": '#ffb0af', 'padding': '10px 20px', "borderRadius": "10px", "color": "white"}} type="submit">Envoyez</button>
            <Spinner marginLeft={"10px"} display={formik.isSubmitting ? 'inline-block' : 'none'} />
          </form>
      </Center>
    </Flex>
  </DefaultLayout>
	</>)
}

export default SendDataPage;