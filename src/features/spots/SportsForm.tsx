import Actions from '@widgets/Actions'
import FormProvider from '@widgets/FormProvider'
import useImageUploader from '@hooks/useImageUploader'
import { ISpot } from './Spots.config'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Grid2 } from '@mui/material'
import { spotsSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { MultiImageType } from '@rootTypes'
import { AddIcon, DeleteIcon } from '@icons'
import { getValuesToUpperCase } from '@helpers'
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
  const [images, setImages] = useState<MultiImageType[]>([])
  const { spotId } = useParams()

  const methods = useForm({
    resolver: yupResolver<ISpot>(spotsSchema),
    defaultValues: defaultValues,
  })

  const { control, handleSubmit, reset, formState, watch } = methods
  const category = watch('category') as SubCategoryType
  const subcategory = watch('subcategory') as EventType | ''

  const isEventAndParty = category === 'Event and Parties'
  const validSubcategories: EventType[] = ['Wedding', 'Birthday', 'Banquet']
  const isValidSubcategory = validSubcategories.some(
    type => type === subcategory,
  )

  const resetForm = () => {
    setImages([])
    reset()
  }

  const { uploadImages } = useImageUploader()
  const submit = (data: ISpot) => {
    const formData = {
      ...data,
      district: ['ANY', ...data.district],
      city: getValuesToUpperCase(data.city),
      category: getValuesToUpperCase(data.category),
      subcategory: getValuesToUpperCase(data.subcategory),
      event_type: getValuesToUpperCase(data?.event_type) ?? undefined,
    }

    uploadImages(
      { images, context: 'object' },
      {
        onSuccess: images => {
          onSubmit({ ...formData, images: images })
          resetForm()
        },
      },
    )
  }

  const handleDeleteSpot = () => {
    console.log(spotId)
  }

  console.log(formState.isSubmitSuccessful)

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
              <TextFieldElement label="Spot name Georgian" name="name_ge" />
            </Grid2>
            <Grid2 size={6}>
              <NumberFieldElement label="Spot Number" name="phone" />
            </Grid2>
            <Grid2 size={6}>
              <TextFieldElement name="email" label="Spot Email" />
            </Grid2>
            <Grid2 size={6}>
              <TextFieldElement name="website" label="Spot Website" />
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
                isMultiple
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
                  disabled={!category.length}
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
                  disabled={!category.length}
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
            {subcategory && isValidSubcategory && isEventAndParty && (
              <Grid2 size={6}>
                <MultiSelectFieldElement
                  label="Event Type"
                  name="event_type"
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
                isSubmited={formState.isSubmitSuccessful}
              />
            </Grid2>
            <Grid2 size={12}>
              <ReachTextEditor
                name="description_ge"
                label="Spot Description Georgian"
                isSubmited={formState.isSubmitSuccessful}
              />
            </Grid2>
            <Grid2 size={12}>
              <MultiImageFieldElement
                name="images"
                images={images}
                setImages={setImages}
                label="Spot Images"
                errorMsg={formState.errors.images?.message}
              />
            </Grid2>
          </Grid2>
        </Box>
      </FormProvider>
    </Box>
  )
}

export default SportsForm
