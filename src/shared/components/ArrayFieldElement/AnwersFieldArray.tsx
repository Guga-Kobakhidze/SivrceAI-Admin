import React, { Dispatch, SetStateAction, useState } from 'react'
import { ImageType } from '@rootTypes'
import { DeleteIcon } from '@icons'
import { useFieldArray } from 'react-hook-form'
import { useFormContext } from '@widgets/FormProvider'
import { StyledFieldArrayText } from './AnswersFieldArray.style'
import { Box, Button, Grid2, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  TextFieldElement,
  CheckboxFieldElement,
  SingleImageFieldElement,
} from '@components'

interface AnwersFieldArrayProps {
  images: ImageType[]
  setImage: Dispatch<SetStateAction<ImageType[]>>
}

const AnwersFieldArray = ({ images, setImage }: AnwersFieldArrayProps) => {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (event) setExpanded(isExpanded ? panel : '')
    }

  const { control } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    name: 'answers',
    control,
  })

  return (
    <React.Fragment>
      {fields.map((field, index) => (
        <Accordion
          key={field.id}
          expanded={expanded === field.id}
          onChange={handleChange(field.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <StyledFieldArrayText>
              <Typography>Answer {index + 1}</Typography>
              {index !== 0 && (
                <span onClick={() => remove(index)}>
                  <DeleteIcon sx={{ color: '#9d3232' }} />
                </span>
              )}
            </StyledFieldArrayText>
          </AccordionSummary>
          <AccordionDetails>
            <Box key={field.id} bgcolor="#fff" borderRadius={2} p={2} mb={2}>
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
                <Grid2 size={12} bgcolor="#cbcbcb48" p={2} borderRadius={2}>
                  <SingleImageFieldElement
                    index={index}
                    image={images[index]}
                    setImage={setImage}
                    label="Answer Icon"
                    name={`answers.${index}.icon`}
                  />
                </Grid2>
              </Grid2>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        variant="outlined"
        sx={{ mt: 1 }}
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

export default AnwersFieldArray
