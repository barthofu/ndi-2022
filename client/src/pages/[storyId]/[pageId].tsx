import type { NextPage, GetServerSideProps } from 'next'

import { Box } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { trpc } from '@utils/lib'

const PagePage: NextPage = () => {

	const { data } = trpc.story.getStory.useQuery({
		id: 1
	})

	return (<>

		<DefaultLayout
			title='Page'
		>

			<Box>
				Hello world from [storyId]/[pageId]
			</Box>

		</DefaultLayout>		
	
	</>)
}

export default PagePage