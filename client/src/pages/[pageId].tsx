import type { NextPage, GetServerSideProps } from 'next'

import { Box } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { trpc } from '@utils/lib'
import { useRouter } from 'next/router'

const PagePage: NextPage = () => {

	const router = useRouter()

	const { data, error } = trpc.story.getStory.useQuery({
		pageId: parseInt(router.query.pageId as string),
	})

	return (<>

		<DefaultLayout
			title='Page'
		>

			{error && <Box>{error.message}</Box>}
			{!data && !error && <Box>Loading...</Box>}
			{data && <Box>{data.text}</Box>}

		</DefaultLayout>		
	
	</>)
}

export default PagePage