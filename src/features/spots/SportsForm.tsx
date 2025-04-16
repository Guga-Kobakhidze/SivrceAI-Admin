import Actions from '@widgets/Actions'
import FormProvider from '@widgets/FormProvider'
import useImageUploader from '@hooks/useImageUploader'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Grid2 } from '@mui/material'
import { spotsSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { MultiImageType } from '@rootTypes'
import { ISpot, SpotsFormProps } from './Spots.config'
import { AddIcon, DeleteIcon, EditIcon } from '@icons'
import { formatPhoneNumber, getCapitalize } from '@helpers'
import {
  CityType,
  CityEnum,
  EventType,
  eventTypes,
  CategoryEnum,
  DistrictEnum,
  subcategories,
  AdditionalEnum,
  PriceRangeEnum,
  SubCategoryType,
  PeopleRangeEnum,
} from '@enums'
import {
  ReachTextEditor,
  TextFieldElement,
  NumberFieldElement,
  MultiImageFieldElement,
  MultiSelectFieldElement,
  AutoCompleteFieldElement,
} from '@components'

const SportsForm = ({
  loading,
  onDelete,
  onSubmit,
  defaultValues,
  isEdit = false,
}: SpotsFormProps) => {
  const image = Array.isArray(defaultValues.image)
    ? defaultValues.image
    : [defaultValues.image].map(img => ({
        img_url: img,
        isMain: false,
      }))

  const [images, setImages] = useState((image as MultiImageType[]) || [])
  const { spotId } = useParams()

  const methods = useForm({
    resolver: yupResolver<ISpot>(spotsSchema),
    defaultValues: {
      ...defaultValues,
      image: image,
      phone: formatPhoneNumber(defaultValues.phone),
      category: Array.isArray(defaultValues.category)
        ? defaultValues.category[0]
        : defaultValues.category,
    },
  })

  const { control, handleSubmit, reset, formState, watch } = methods
  const city = watch('city') as CityType
  const category = watch('category') as SubCategoryType
  const subcategory = watch('subcategory') as EventType | ''

  const isHideDistrict = city !== 'Chokhatauri' && city !== 'Ozurgeti'
  const isEventAndParty = category === 'EVENT_PARTIES'
  const validSubcategories: EventType[] = ['WEDDING', 'BIRTHDAY', 'BANQUET']
  const isValidSubcategory = validSubcategories.some(
    type => type === subcategory,
  )

  const resetForm = () => {
    setImages([])
    reset()
  }

  const { uploadImages, isUploading } = useImageUploader()
  const submit = (data: ISpot) => {
    const formData = {
      ...data,
      district: data.district && ['ANY', ...data.district],
    } as Omit<ISpot, 'id'>

    !!images.length
      ? uploadImages(
          { images, context: 'object' },
          {
            onSuccess: images => {
              onSubmit({ data: formData, image: images })
              resetForm()
            },
          },
        )
      : onSubmit({ data: formData, image: [] })
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
            type: 'button',
            hidden: !isEdit,
            loadText: 'Deleting',
            variant: 'contained',
            icon: <DeleteIcon />,
            action: () => onDelete?.(spotId ?? ''),
          },
          {
            color: 'primary',
            variant: 'contained',
            type: 'button',
            disabled: loading || isUploading,
            title: isEdit ? 'Edit' : 'Submit',
            icon: isEdit ? <EditIcon /> : <AddIcon />,
            loadText: isEdit ? 'Editing' : 'Submitting',
            action: handleSubmit(submit),
          },
        ]}
      />
      <FormProvider control={control}>
        <Box mt={3} component="form" onSubmit={handleSubmit(submit)}>
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
                  label: getCapitalize(value),
                  value: key,
                }))}
              />
            </Grid2>
            {isHideDistrict && (
              <Grid2 size={6}>
                <MultiSelectFieldElement
                  label="District"
                  name="district"
                  isMultiple
                  options={Object.entries(DistrictEnum).map(([key, value]) => ({
                    label: getCapitalize(value),
                    value: key,
                  }))}
                />
              </Grid2>
            )}
            <Grid2 size={6}>
              <AutoCompleteFieldElement
                label="Category"
                name="category"
                options={Object.entries(CategoryEnum).map(([key, value]) => ({
                  label: getCapitalize(value),
                  value: key,
                }))}
              />
            </Grid2>
            <Grid2 size={6}>
              {isEventAndParty ? (
                <AutoCompleteFieldElement
                  label="Subcategory"
                  name="subcategory"
                  disabled={!category?.length}
                  options={
                    category && subcategories[category]
                      ? subcategories[category]?.map(item => ({
                          label: getCapitalize(item),
                          value: item,
                        }))
                      : []
                  }
                />
              ) : (
                <MultiSelectFieldElement
                  label="Subcategory"
                  name="subcategory"
                  disabled={!category?.length}
                  options={
                    category && subcategories[category]
                      ? subcategories[category]?.map(item => ({
                          label: getCapitalize(item),
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
                          label: getCapitalize(item),
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
            <Grid2 size={6}>
              <AutoCompleteFieldElement
                label="Additional Info"
                name="additional"
                options={Object.entries(AdditionalEnum).map(([key, value]) => ({
                  label: getCapitalize(value),
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
                errorMsg={formState.errors.image?.message}
              />
            </Grid2>
          </Grid2>
        </Box>
      </FormProvider>
    </Box>
  )
}

export default SportsForm
