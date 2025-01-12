import { HStack } from '@widgets/Stack'
import { FilterProps } from 'react-table'
import {
  Children,
  cloneElement,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react'

const TableFiltersContext = createContext({
  names: [],
})
export const useTableFiltersContext = () => useContext(TableFiltersContext)

export const TableFilters: React.FC<PropsWithChildren> = ({ children }) => {
  const childCount = Children.count(children)

  const passedFilterNames = Children.map(children, child => {
    if (child === null) return
    // eslint-disable-next-line
    // @ts-ignore
    return child?.props.name
  })
  return (
    <TableFiltersContext.Provider value={{ names: passedFilterNames } as any}>
      <HStack alignItems="stretch" my={3}>
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        {Children.map(children, (child: React.FC<FilterProps<any>>, index) => {
          if (childCount === 1) {
            return cloneElement(child as any, {
              sx: {
                borderRadius: 0,
                borderBottomLeftRadius: '15px',
                borderTopLeftRadius: '15px',
                borderBottomRightRadius: '15px',
                borderTopRightRadius: '15px',
              },
            })
          }
          if (index === 0)
            return cloneElement(child as any, {
              sx: {
                borderRadius: 0,
                borderBottomLeftRadius: '15px',
                borderTopLeftRadius: '15px',
              },
            })
          if (index === childCount - 1) {
            return cloneElement(child as any, {
              sx: {
                borderRadius: 0,
                borderBottomRightRadius: '15px',
                borderTopRightRadius: '15px',
              },
            })
          }
          return child
        })}
      </HStack>
    </TableFiltersContext.Provider>
  )
}
