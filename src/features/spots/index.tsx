import SpotsTable from './SpotsTable'
import TabSwitcher from '@widgets/TabSwitcher'
import { Box } from '@mui/material'
import { ROUTES } from '@constants'
import { useSearchParams } from 'react-router-dom'
import SpotsActions from './Spots.actions'
import SpotQuestionsAction from './SpotsQuestions/SpotQuestion.action'
import SpotsQuestionsTable from './SpotsQuestions/SpotsQuestionsTable'

const Spots = () => {
  const [params] = useSearchParams()
  const activeTab = params.get('type') === 'questions' && 1

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TabSwitcher
          activeTab={+activeTab}
          tabs={[
            { id: 0, label: 'Spots', link: ROUTES.spotsTable },
            { id: 2, label: 'Questions', link: ROUTES.spotsQuestionTable },
          ]}
        />
        {activeTab ? <SpotQuestionsAction /> : <SpotsActions />}
      </Box>
      {activeTab ? <SpotsQuestionsTable /> : <SpotsTable />}
    </Box>
  )
}

export default Spots
