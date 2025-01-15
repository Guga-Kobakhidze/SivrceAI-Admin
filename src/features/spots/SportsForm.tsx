import Actions from '@widgets/Actions'
import FormProvider from '@widgets/FormProvider'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Grid2 } from '@mui/material'
import { useParams } from 'react-router-dom'
import { AddIcon, DeleteIcon } from '@icons'
import {
  ReachTextEditor,
  TextFieldElement,
  ImageFieldElement,
  NumberFieldElement,
} from '@components'

const SportsForm = ({ defaultValues, onSubmit, isEdit }: any) => {
  const { spotId } = useParams()
  const fileBlobs = useRef<string[]>([])
  const methods = useForm({
    // resolver: yupResolver(),
    defaultValues: defaultValues,
  })

  const { control, handleSubmit, reset, formState } = methods

  const submit = (data: any) => {
    onSubmit(data)
    reset()
  }

  const handleDeleteSpot = (id: string | undefined) => {
    console.log(id)
  }

  return (
    <FormProvider control={control}>
      <Box component="form" onSubmit={handleSubmit(submit)}>
        <Actions
          title={`${isEdit ? 'Edit' : 'Create'} Spot`}
          subtitle="Spots"
          toolbars={[
            {
              title: 'Delete',
              color: 'error',
              icon: <DeleteIcon />,
              variant: 'contained',
              type: 'button',
              hidden: !isEdit,
              action: () => {
                handleDeleteSpot(spotId)
              },
            },
            {
              title: 'Submit',
              color: 'primary',
              icon: <AddIcon />,
              variant: 'contained',
              type: 'button',
              action: handleSubmit(submit),
            },
          ]}
        />
        <Grid2 container alignItems="start" spacing={3}>
          <Grid2 size={6}>
            <TextFieldElement label="Spot Name" name="spotName" />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldElement label="Spot Title" name="spotTitle" />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldElement label="Spot Email" name="spotEmail" />
          </Grid2>
          <Grid2 size={6}>
            <NumberFieldElement name="spotNumber" label="Spot Number" />
          </Grid2>
          <Grid2 size={6}>
            <NumberFieldElement
              name="pricePerPerson"
              label="Price Per Person"
            />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldElement name="spotAddress" label="Spot Address" />
          </Grid2>
          <Grid2 size={12}>
            <ReachTextEditor
              name="spotDescription"
              label="Spot Description"
              isSubmited={formState.isSubmitted}
            />
          </Grid2>
          <Grid2 size={12}>
            <ImageFieldElement
              multiple
              name="spotImages"
              label="Spot Images"
              imageBlob={fileBlobs}
            />
          </Grid2>
        </Grid2>
      </Box>
    </FormProvider>
  )
}

export default SportsForm
