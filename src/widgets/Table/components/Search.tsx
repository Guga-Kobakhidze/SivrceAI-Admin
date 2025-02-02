import FormProvider from '@widgets/FormProvider'
import { TextField } from '@mui/material'
import { getSearchParams } from '@utils'
import { useSearchParams } from 'react-router-dom'
import { TableFilterProps } from '../Table.config'
import { useForm, Controller } from 'react-hook-form'
import { useState, useCallback } from 'react'

export const Search: React.FC<
  TableFilterProps<
    { searchTerm: string },
    { defaultValue?: string | undefined }
  >
> = ({ name, sx = undefined }) => {
  const [, setParams] = useSearchParams()
  const searchParams = getSearchParams<any>()
  const noName = name === ''

  const { control } = useForm({
    defaultValues: {
      searchTerm: searchParams[name] || '',
    },
  })

  const [searchTerm, setSearchTerm] = useState(searchParams[name] || '')

  const debounceFn = useCallback(
    (value: string) => {
      const timer = setTimeout(() => {
        setParams(prev => {
          prev.set(name, value)
          prev.set('page', '1')
          return prev
        })
      }, 500)

      return () => clearTimeout(timer)
    },
    [name, setParams],
  )

  return (
    <FormProvider control={control}>
      <Controller
        name="searchTerm"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                background: 'white',
                height: '62px',
              },
              ...sx,
            }}
            multiline
            rows={2}
            label={noName ? '' : 'Search'}
            disabled={noName}
            onChange={e => {
              const value = e.target.value
              setSearchTerm(value)
              debounceFn(value)
            }}
            value={searchTerm}
          />
        )}
      />
    </FormProvider>
  )
}
