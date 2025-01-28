import { Box } from '@mui/material'
import { ROUTES } from '@constants'
import TabSwitcher from '@widgets/TabSwitcher'
import InteriorQuestionAction from './InteriorQuestion.action'
import InteriorQuestionsTable from './InteriorQuestionsTable'

const Interior = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <TabSwitcher
          activeTab={0}
          tabs={[
            { id: 1, label: 'Questions', link: ROUTES.interiorQuestionTable },
          ]}
        />
        <InteriorQuestionAction />
      </Box>
      <InteriorQuestionsTable />
    </Box>
  )
}

export default Interior
