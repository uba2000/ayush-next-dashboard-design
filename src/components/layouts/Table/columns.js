import { format } from 'date-fns';

import {
  DifficultyFilter,
  TrafficFilter,
  VolumeFilter,
  CPCFilter,
  KeywordFilter,
} from '../../../page-components/keyword-results';
import { fCurrency } from '../../../utils/formatNumber';

const tagLayout = ({ value }) => {
  return (
    <span className="line-clamp-1 select-none">
      {value ? value.join(', ') : ''}
    </span>
  );
};

export const PROJECTS_COLUNM = [
  {
    Header: 'All Projects',
    accessor: 'title',
    main: true,
    Cell: ({ value }) => {
      return <span className="line-clamp-1 select-none">{value}</span>;
    },
  },
  {
    Header: 'Tags',
    accessor: 'tags',
    Cell: tagLayout,
    width: '27%',
    minWidth: '169px',
  },
  {
    Header: 'Date',
    accessor: 'created_at',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy');
    },
    width: '12%',
    minWidth: '144px',
  },
];

export const ARTICLES_COLUNM = [
  {
    Header: 'Articles',
    accessor: 'title',
    main: true,
    Cell: ({ value }) => {
      return <span className="line-clamp-1">{value}</span>;
    },
  },
  {
    Header: 'Tags',
    accessor: 'tags',
    Cell: ({ value }) => {
      return <span className="line-clamp-1">{value.join(', ')}</span>;
    },
    width: '27%',
    minWidth: '169px',
  },
  {
    Header: 'Date',
    accessor: 'created_at',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy');
    },
    width: '12%',
    minWidth: '144px',
  },
];

export const KEYWORDS_COLUNM = [
  {
    Header: 'Keyword List',
    accessor: 'title',
    main: true,
    Cell: ({ value }) => {
      return <span className="line-clamp-1">{value}</span>;
    },
  },
  {
    Header: 'Tags',
    accessor: 'tags',
    Cell: ({ value }) => {
      return <span className="line-clamp-1">{value.join(', ')}</span>;
    },
    width: '27%',
    minWidth: '169px',
  },
  {
    Header: 'Date',
    accessor: 'created_at',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy');
    },
    width: '12%',
    minWidth: '144px',
  },
];

export const KEYWORDSLIST_COLUNM = [
  {
    Header: 'Keywords',
    accessor: 'question',
    main: true,
    Cell: ({ value }) => {
      return <span className="line-clamp-1">{value}</span>;
    },
    filter: 'search',
    Filter: KeywordFilter,
  },
  {
    Header: 'Volume',
    accessor: 'volume',
    Cell: ({ value }) => {
      return <span className="block text-center">{value}</span>;
    },
    minWidth: '110px',
    filter: 'between',
    Filter: VolumeFilter,
  },
  {
    Header: 'Traffic',
    accessor: 'traffic',
    Cell: ({ value }) => {
      return <span className="block text-center">{value}</span>;
    },
    minWidth: '110px',
    filter: 'between',
    Filter: TrafficFilter,
  },
  {
    Header: 'CPC',
    accessor: 'cpc',
    Cell: ({ value }) => {
      return <span className="block text-center">{`${fCurrency(value)}`}</span>;
    },
    minWidth: '110px',
    filter: 'between',
    Filter: CPCFilter,
  },
  {
    Header: 'Difficulty',
    accessor: 'difficulty',
    Cell: ({ value }) => {
      return <span className="block text-center">{value}</span>;
    },
    minWidth: '110px',
    filter: 'between',
    Filter: DifficultyFilter,
  },
  {
    Header: 'Trending',
    accessor: 'trending',
    Cell: ({ value }) => {
      return <span className="block text-center">{value}%</span>;
    },
    minWidth: '110px',
  },
  {
    Header: 'AIT',
    accessor: 'ait',
    Cell: ({ value }) => {
      return <span className="block text-center">{value}</span>;
    },
    minWidth: '110px',
  },
];

export const ACCOUNT_HISTORY_COLUNM = [
  {
    Header: 'Project Titles',
    accessor: 'title',
    main: true,
    Cell: ({ value }) => {
      return <span className="line-clamp-1">{value || ''}</span>;
    },
  },
  {
    Header: 'Credits',
    accessor: 'credits',
    minWidth: '140px',
  },
  {
    Header: 'Tags',
    accessor: 'tags',
    Cell: tagLayout,
    minWidth: '169px',
  },
  {
    Header: 'Date',
    accessor: 'created_at',
    Cell: ({ value }) => {
      return format(new Date(value || ''), 'dd/MM/yyyy h:m bb');
    },
    minWidth: '194px',
  },
];

export const ARTICLE_GENERATE_COLUMN = [];
