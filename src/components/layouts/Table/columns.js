import { format } from 'date-fns'

export const PROJECTS_COLUNM = [
  {
    Header: 'All Projects',
    accessor: 'title',
    main: true,
  },
  {
    Header: 'Tags',
    accessor: 'tags',
    Cell: ({ value }) => {
      return (
        <span className='line-clamp-1'>
          {value.join(', ')}
        </span>
      )
    },
    width: '27%',
    minWidth: '169px'
  },
  {
    Header: 'Date',
    accessor: 'date',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
    width: '12%',
    minWidth: '144px'
  },
]

export const ARTICLES_COLUNM = [
  {
    Header: 'Articles',
    accessor: 'title',
    main: true,
  },
  {
    Header: 'Tags',
    accessor: 'tags',
    Cell: ({ value }) => {
      return (
        <span className='line-clamp-1'>
          {value.join(', ')}
        </span>
      )
    },
    width: '27%',
    minWidth: '169px'
  },
  {
    Header: 'Date',
    accessor: 'date',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
    width: '12%',
    minWidth: '144px'
  },
]

export const KEYWORDS_COLUNM = [
  {
    Header: 'Keyword List',
    accessor: 'title',
    main: true,
  },
  {
    Header: 'Tags',
    accessor: 'tags',
    Cell: ({ value }) => {
      return (
        <span className='line-clamp-1'>
          {value.join(', ')}
        </span>
      )
    },
    width: '27%',
    minWidth: '169px'
  },
  {
    Header: 'Date',
    accessor: 'date',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
    width: '12%',
    minWidth: '144px'
  },
]