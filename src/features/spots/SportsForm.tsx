import Actions from '@widgets/Actions'
import FormProvider from '@widgets/FormProvider'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Grid2 } from '@mui/material'
import { useParams } from 'react-router-dom'
import { AddIcon, DeleteIcon } from '@icons'
import {
  CategoryEnum,
  DistrictEnum,
  EventType,
  eventTypes,
  PeopleRangeEnum,
  PriceRangeEnum,
  StreetEnum,
  subcategories,
  SubCategoryType,
} from '@enums'
import {
  ReachTextEditor,
  TextFieldElement,
  ImageFieldElement,
  NumberFieldElement,
  AutoCompleteFieldElement,
} from '@components'

const SportsForm = ({ defaultValues, onSubmit, isEdit }: any) => {
  const { spotId } = useParams()
  const fileBlobs = useRef<string[]>([])

  const methods = useForm({
    // resolver: yupResolver(),
    defaultValues: defaultValues,
  })

  const { control, handleSubmit, reset, formState, watch } = methods
  const category = watch('category') as SubCategoryType | ''
  const subcategory = watch('subcategory') as EventType | ''

  const validSubcategories: EventType[] = ['Wedding', 'Birthday', 'Banquet']
  const isValidSubcategory = validSubcategories.some(
    type => type === subcategory,
  )

  const submit = (data: any) => {
    onSubmit(data)
    reset()
  }

  const handleDeleteSpot = () => {
    console.log(spotId)
  }

  return (
    <Box>
      <Actions
        title="Spots"
        isNavigate
        toolbars={[
          {
            title: 'Delete',
            color: 'error',
            icon: <DeleteIcon />,
            variant: 'contained',
            type: 'button',
            hidden: !isEdit,
            action: handleDeleteSpot,
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
      <FormProvider control={control}>
        <Box component="form" onSubmit={handleSubmit(submit)}>
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
            <Grid2 size={6}>
              <AutoCompleteFieldElement
                label="Street"
                name="street"
                options={Object.entries(StreetEnum).map(([key, value]) => ({
                  label: value,
                  value: key,
                }))}
              />
            </Grid2>
            <Grid2 size={6}>
              <AutoCompleteFieldElement
                label="District"
                name="district"
                options={Object.entries(DistrictEnum).map(([key, value]) => ({
                  label: value,
                  value: key,
                }))}
              />
            </Grid2>
            <Grid2 size={6}>
              <AutoCompleteFieldElement
                label="Category"
                name="category"
                options={Object.entries(CategoryEnum).map(([, value]) => ({
                  label: value,
                  value: value,
                }))}
              />
            </Grid2>
            <Grid2 size={6}>
              <AutoCompleteFieldElement
                label="Subcategory"
                name="subcategory"
                disabled={!category}
                options={
                  category && subcategories[category]
                    ? subcategories[category]?.map(item => ({
                        label: item,
                        value: item,
                      }))
                    : []
                }
              />
            </Grid2>
            {subcategory && isValidSubcategory && (
              <Grid2 size={6}>
                <AutoCompleteFieldElement
                  label="Event Type"
                  name="eventType"
                  options={
                    subcategory && eventTypes[subcategory]
                      ? eventTypes[subcategory].map(item => ({
                          label: item,
                          value: item,
                        }))
                      : []
                  }
                />
              </Grid2>
            )}
            <Grid2 size={6}>
              <AutoCompleteFieldElement
                label="People Range"
                name="peopleRange"
                options={Object.entries(PeopleRangeEnum).map(
                  ([key, value]) => ({
                    label: value,
                    value: key,
                  }),
                )}
              />
            </Grid2>
            <Grid2 size={6}>
              <AutoCompleteFieldElement
                label="Price Rnage"
                name="priceRange"
                options={Object.entries(PriceRangeEnum).map(([key, value]) => ({
                  label: value,
                  value: key,
                }))}
              />
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
    </Box>
  )
}

export default SportsForm
