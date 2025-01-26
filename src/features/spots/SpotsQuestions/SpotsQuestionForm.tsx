import Actions from '@widgets/Actions'
import NoDataFound from '@widgets/NoDataFound'
import FormProvider from '@widgets/FormProvider'
import SpotsAnwersFieldArray from './SpotsAnwersFieldArray'
import { useForm } from 'react-hook-form'
import { Box, Grid2 } from '@mui/material'
import { spotsSchema } from '../schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSpotQuestions } from './useSpotQuestions'
import { AddIcon, DeleteIcon } from '@icons'
import {
  defaultValues,
  IQuestion,
  SpotsQuestionsFormProps,
} from './SpotsQuestions.config'
import {
  TextFieldElement,
  NumberFieldElement,
  CheckboxFieldElement,
  AutoCompleteFieldElement,
} from '@components'

const SpotsQuestionsForm = ({
  error,
  onSubmit,
  onDelete,
  isLoading,
  prefill = undefined,
  isEdit = false,
}: SpotsQuestionsFormProps) => {
  const methods = useForm<IQuestion>({
    resolver: yupResolver(spotsSchema),
    defaultValues: prefill || defaultValues,
  })

  const { control, handleSubmit } = methods
  const { data: questions } = useSpotQuestions()

  const submit = (data: IQuestion) => onSubmit(data)

  if (error && isEdit) return <NoDataFound />

  return (
    <Box>
      <Actions
        title="Spots Question"
        isNavigate
        toolbars={[
          {
            title: 'Delete',
            color: 'error',
            icon: <DeleteIcon />,
            variant: 'contained',
            type: 'button',
            hidden: !isEdit,
            action: onDelete,
          },
          {
            title: isEdit ? 'edit' : 'create',
            color: 'primary',
            icon: <AddIcon />,
            variant: 'contained',
            type: 'button',
            disabled: isLoading,
            loadText: isEdit ? 'editting' : 'creating',
            action: handleSubmit(submit),
          },
        ]}
      />
      <FormProvider control={control}>
        <Box pt={3} component="form" onSubmit={handleSubmit(submit)}>
          <Grid2 container alignItems="start" spacing={3}>
            <Grid2 size={6}>
              <TextFieldElement name="question_value" label="Question Value" />
            </Grid2>
            <Grid2 size={6}>
              <TextFieldElement name="id" label="Question Id" />
            </Grid2>
            <Grid2 size={6}>
              <TextFieldElement name="text" label="Question Title" />
            </Grid2>
            <Grid2 size={6}>
              <TextFieldElement name="text_en" label="Question Title English" />
            </Grid2>
            <Grid2 size={6}>
              <AutoCompleteFieldElement
                name="previous_question_id"
                label="Previous Question Id"
                options={
                  questions?.map(q => ({
                    value: q.id,
                    label: q.text,
                  })) || []
                }
              />
            </Grid2>
            <Grid2 size={6}>
              <NumberFieldElement label="Progress Value" name="progress_val" />
            </Grid2>
            <Grid2 size={6}>
              <NumberFieldElement name="step" label="Step" />
            </Grid2>
            <Grid2 size={2}>
              <CheckboxFieldElement
                label="Is Multi Select"
                name="is_multi_select"
              />
            </Grid2>
            <Grid2 size={2}>
              <CheckboxFieldElement
                label="Is Multi Choice"
                name="is_multi_choice"
              />
            </Grid2>
            <Grid2 size={12}>
              <SpotsAnwersFieldArray />
            </Grid2>
          </Grid2>
        </Box>
      </FormProvider>
    </Box>
  )
}

export default SpotsQuestionsForm
