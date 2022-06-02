import { format } from 'date-fns'

export const PROJECT_COLUNMS = [
  {
    Header: 'All Projects',
    accessor: 'title'
  },
  {
    Header: 'Tags',
    accessor: 'tags',
    cell: ({ value }) => {
      return value.join(', ')
    }
  },
  {
    Header: 'Date',
    accessor: 'date',
    cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    }
  },
]