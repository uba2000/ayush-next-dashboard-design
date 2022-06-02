import { format } from 'date-fns'
import { fCurrency } from '../../../utils/formatNumber'

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

export const KEYWORDSLIST_COLUNM = [
  {
    Header: 'Keywords',
    accessor: 'question',
    main: true,
  },
  {
    Header: 'Volume',
    accessor: 'volume',
    Cell: ({ value }) => {
      return (
        <span className='block text-center'>
          {value}
        </span>
      )
    },
  },
  {
    Header: 'Traffic',
    accessor: 'traffic',
    Cell: ({ value }) => {
      return (
        <span className='block text-center'>
          {value}
        </span>
      )
    },
  },
  {
    Header: 'CPC',
    accessor: 'cpc',
    Cell: ({ value }) => {
      return (
        <span className='block text-center'>
          {`${fCurrency(value)}`}
        </span>
      )
    },
  },
  {
    Header: 'Difficulty',
    accessor: 'difficulty',
    Cell: ({ value }) => {
      return (
        <span className='block text-center'>
          {value}
        </span>
      )
    },
  },
  {
    Header: 'Trending',
    accessor: 'trending',
    Cell: ({ value }) => {
      return (
        <span className='block text-center'>
          {value}%
        </span>
      )
    },
  },
  {
    Header: 'AIT',
    accessor: 'ait',
    Cell: ({ value }) => {
      return (
        <span className='block text-center'>
          {value}
        </span>
      )
    },
  },
]