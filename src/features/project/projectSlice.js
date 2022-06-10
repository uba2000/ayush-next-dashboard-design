import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import returnKeywords from '../../_mock/keywords';
import returnKeywordList from '../../_mock/keywordList';
import features from '../../_mock/features';
import featureList from '../../_mock/featuresList';
import articles from '../../_mock/articles';
import { setHeaders, get } from '../../utils/http';

const initialState = {
  projects: {
    data: [],
    loading: false,
    error: '',
  },
  // Keywords State
  keywords: returnKeywords.keywords,
  keywordList: returnKeywordList.keywordList,
  // Features State
  projectFeatures: features,
  projectFeatureList: featureList,
  // Articles State
  projectArticles: articles,

  keywordQuestions: [],
  keywordsStackAnalysed: [],

  articlesDetailsGenerate: null,
};

const getAFeatureList = (id) => {
  return featureList.find((fl) => fl.id == id);
};

// const deleteAFeatureListContent = createAsyncThunk(
//   'project/deleteAFeatureListContent',
//   ({ featureId, featureListContentId }) => {
//     let featureListContentIndex = featureList.findIndex(
//       (pl) => pl.id == featureId
//     );
//     let newFeatureList = featureList[
//       featureListContentIndex
//     ].featureContent.filter((fc) => fc.id != featureListContentId);
//     dispatch({ type: 'setProjectFeatureList', value: newFeatureList });
//   }
// );

export const getProjects = createAsyncThunk(
  'project/getProjects',
  async (session) => {
    const { response } = await get({
      url: `${process.env.BASE_URL}/api/project`,
      headers: setHeaders({ token: session.user.accessToken }),
    });
    return response.data.data;
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setKeywordQuestions: (state, action) => {
      state.keywordQuestions = action.payload;
    },
    setKeywordsStackAnalysed: (state, action) => {
      state.keywordsStackAnalysed = action.payload;
    },
    setProjectFeatureList: (state, action) => {
      state.projectFeatureList = action.payload;
    },
    setProjects: (state, action) => {
      state.projects.data = action.payload;
    },
    setArticlesDetailsGenerate: (state, action) => {
      state.articlesDetailsGenerate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProjects.pending, (state) => {
      state.projects.loading = true;
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects.data = action.payload;
      state.projects.error = '';
      state.projects.loading = false;
    });
    builder.addCase(getProjects.rejected, (state, action) => {
      state.projects.data = [];
      state.projects.error = action.error.message;
      state.projects.loading = false;
    });
  },
});

export default projectSlice.reducer;

export const {
  setArticlesDetailsGenerate,
  setProjects,
  setKeywordQuestions,
  setKeywordsStackAnalysed,
} = projectSlice.actions;

export { getAFeatureList };
