import Actions from '@widgets/Actions'
import FormProvider from '@widgets/FormProvider'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ImageType } from '@rootTypes'
import { Box, Grid2 } from '@mui/material'
import { AddIcon, DeleteIcon } from '@icons'
import {
  CategoryEnum,
  CityEnum,
  DistrictEnum,
  EventType,
  eventTypes,
  PeopleRangeEnum,
  PriceRangeEnum,
  subcategories,
  SubCategoryType,
} from '@enums'
import {
  ReachTextEditor,
  TextFieldElement,
  NumberFieldElement,
  AutoCompleteFieldElement,
  MultiSelectFieldElement,
  MultiImageFieldElement,
} from '@components'

const SportsForm = ({ defaultValues, onSubmit, isEdit }: any) => {
  const [images, setImages] = useState<ImageType[]>([])
  const { spotId } = useParams()

  const methods = useForm({
    // resolver: yupResolver(),
    defaultValues: defaultValues,
  })

  const { control, handleSubmit, reset, formState, watch } = methods
  const category = watch('category') as SubCategoryType | ''
  const subcategory = watch('subcategory') as EventType | ''

  const isEventAndParty = category === 'Event and Parties'
  const validSubcategories: EventType[] = ['Wedding', 'Birthday', 'Banquet']
  const isValidSubcategory = validSubcategories.some(
    type => type === subcategory,
  )

  const submit = (data: any) => {
    onSubmit(data, images)
    setImages([])
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
              <TextFieldElement label="Spot Name" name="name" />
            </Grid2>
            <Grid2 size={6}>
              <TextFieldElement label="Spot Title" name="title" />
            </Grid2>
            <Grid2 size={6}>
              <NumberFieldElement label="Spot Number" name="phone" />
            </Grid2>
            <Grid2 size={6}>
              <NumberFieldElement name="email" label="Spot Email" />
            </Grid2>
            <Grid2 size={6}>
              <TextFieldElement label="Spot Address" name="address" />
            </Grid2>
            <Grid2 size={6}>
              <AutoCompleteFieldElement
                label="city"
                name="city"
                options={Object.entries(CityEnum).map(([key, value]) => ({
                  label: value,
                  value: key,
                }))}
              />
            </Grid2>
            <Grid2 size={6}>
              <MultiSelectFieldElement
                label="District"
                name="district"
                isMltiple
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
              {isEventAndParty ? (
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
              ) : (
                <MultiSelectFieldElement
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
              )}
            </Grid2>
            {subcategory && isValidSubcategory && (
              <Grid2 size={6}>
                <MultiSelectFieldElement
                  label="Event Type"
                  name="cuisine_type"
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
              <MultiSelectFieldElement
                label="People Range"
                name="people_range"
                options={Object.entries(PeopleRangeEnum).map(
                  ([key, value]) => ({
                    label: value,
                    value: key,
                  }),
                )}
              />
            </Grid2>
            <Grid2 size={6}>
              <MultiSelectFieldElement
                label="Price Rnage"
                name="price_range"
                options={Object.entries(PriceRangeEnum).map(([key, value]) => ({
                  label: value,
                  value: key,
                }))}
              />
            </Grid2>
            <Grid2 size={12}>
              <ReachTextEditor
                name="description"
                label="Spot Description"
                isSubmited={formState.isSubmitted}
              />
            </Grid2>
            <Grid2 size={12}>
              <ReachTextEditor
                name="description_ge"
                label="Spot Description English"
                isSubmited={formState.isSubmitted}
              />
            </Grid2>
            <Grid2 size={12}>
              <MultiImageFieldElement
                isMltiple
                name="images"
                images={images}
                setImages={setImages}
                label="Spot Images"
              />
            </Grid2>
          </Grid2>
        </Box>
      </FormProvider>
    </Box>
  )
}

export default SportsForm
