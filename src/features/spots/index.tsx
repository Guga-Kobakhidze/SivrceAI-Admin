import SpotsTable from './SpotsTable'
import TabSwitcher from '@widgets/TabSwitcher'
import SpotsActions from './Spots.actions'
import SpotQuestionsAction from './SpotsQuestions/SpotQuestion.action'
import SpotsQuestionsTable from './SpotsQuestions/SpotsQuestionsTable'
import { Box } from '@mui/material'
import { ROUTES } from '@constants'
import { useSearchParams } from 'react-router-dom'
import { ActiveTabKey, TabOption } from './Spots.config'

const activeTabOptions: Record<ActiveTabKey, TabOption> = {
  0: { Actions: SpotsActions, Table: SpotsTable },
  1: { Actions: SpotQuestionsAction, Table: SpotsQuestionsTable },
}

const getActivePage = (tab: ActiveTabKey): TabOption => {
  return activeTabOptions[tab]
}

const Spots = () => {
  const [params] = useSearchParams()
  const activeTab = params.get('type') === 'questions' ? 1 : 0
  const { Actions, Table } = getActivePage(activeTab)

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TabSwitcher
          activeTab={activeTab}
          tabs={[
            { id: 0, label: 'Spots', link: ROUTES.spotsTable },
            { id: 1, label: 'Questions', link: ROUTES.spotsQuestionTable },
          ]}
        />
        <Actions />
      </Box>
      <Table />
    </Box>
  )
}

export default Spots
