import { trpc } from '@utils/lib'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Box, Flex, Spinner } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { Page } from '@components/modules'

const PageComponent = dynamic(() => Promise.resolve(Page), {
	ssr: false
})

const PagePage: NextPage<any> = ({ setScore }) => {

	const router = useRouter()
	const pageId = router.query.pageId as string
	if (pageId === '-1' && typeof window !== 'undefined') {
		router.push('/envoi')
	}

	const { data, error } = trpc.story.getStory.useQuery({
		pageId: parseInt(pageId),
	})

	return (<>

		<DefaultLayout
			title='Page'
		>

			{error && <Box>{error.message}</Box>}
			{!data && !error && <Flex w='100vw' h='100vh' alignItems='center' justifyContent='center'><Spinner /></Flex>}
			{data && <>
				
				<PageComponent page={data}/>

			</>}

		</DefaultLayout>		
	
	</>)
}

export default PagePage