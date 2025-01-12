import { Control, FieldValues, SetFieldValue } from 'react-hook-form'
import { createContext, PropsWithChildren, useContext } from 'react'

type ContextType<T extends FieldValues> = {
  control: Control<T> | undefined
  setValue?: SetFieldValue<FieldValues> | undefined
}

const FormContext = createContext<ContextType<FieldValues>>({
  control: undefined,
  setValue: undefined,
})

const FormProvider = <T extends FieldValues = FieldValues>({
  control,
  setValue,
  children,
}: PropsWithChildren<ContextType<T>>) => {
  return (
    <FormContext.Provider
      value={{ control: control as unknown as Control, setValue }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = () => {
  const context = useContext(FormContext)

  if (context === undefined)
    throw new Error('FormContext was used outside of Form')

  return context
}

export default FormProvider
