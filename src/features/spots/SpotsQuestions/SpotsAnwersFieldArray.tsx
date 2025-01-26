import React, { useRef } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useFormContext } from '@widgets/FormProvider'
import { Box, Button, Grid2, Typography } from '@mui/material'
import {
  CheckboxFieldElement,
  ImageFieldElement,
  TextFieldElement,
} from '@components'

const SpotsAnwersFieldArray = () => {
  const iconRef = useRef<string[]>([])
  const { control } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    name: 'answers',
    control,
  })

  return (
    <React.Fragment>
      {fields.map((field, index) => (
        <Box key={field.id} bgcolor="#fff" borderRadius={2} p={2} mb={2}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Answer {index + 1}</Typography>
            {index !== 0 && (
              <Button
                variant="text"
                color="error"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            )}
          </Box>
          <Grid2 container spacing={3}>
            <Grid2 size={6}>
              <TextFieldElement
                label="Answer Value"
                name={`answers.${index}.value`}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextFieldElement
                label="Answer Id"
                name={`answers.${index}.id`}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextFieldElement
                label="Answer Title"
                name={`answers.${index}.text`}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextFieldElement
                label="Answer Title English"
                name={`answers.${index}.text_en`}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextFieldElement
                label="Next Question Id"
                name={`answers.${index}.next_question_id`}
              />
            </Grid2>
            <Grid2 size={6}>
              <CheckboxFieldElement
                label="Is Answer Disabled"
                name={`answers.${index}.disabled`}
              />
            </Grid2>
            <Grid2 size={12} bgcolor="#9f9f9f4a" p={2} borderRadius={2}>
              <ImageFieldElement
                imageBlob={iconRef}
                label="Answer Icon"
                name={`answers.${index}.icon`}
              />
            </Grid2>
          </Grid2>
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={() =>
          append({
            value: '',
            id: '',
            text: '',
            icon: null,
            text_en: '',
            disabled: false,
            next_question_id: '',
          })
        }
      >
        Add New Answer
      </Button>
    </React.Fragment>
  )
}

export default SpotsAnwersFieldArray
