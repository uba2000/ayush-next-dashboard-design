import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import returnKeywords from '../../_mock/keywords';
import returnKeywordList from '../../_mock/keywordList';
import features from '../../_mock/features';
import featureList from '../../_mock/featuresList';
import articles from '../../_mock/articles';
import { setHeaders, get } from '../../utils/http';

const initialState = {
  projects: [],
  projectPage: {
    articles: [],
    keywordList: [],
    project: null,
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
    try {
      const { response } = await get({
        url: `${process.env.BASE_URL}/api/project`,
        headers: setHeaders({ token: session.user.accessToken }),
      });
      return response.data.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue('');
    }
  }
);

const update = ({ items, id, updateObject }) => {
  const projectIndex = items.findIndex((item) => item._id == id);
  for (let key in updateObject) {
    items[projectIndex][key] = updateObject[key];
  }

  return items;
};

const remove = ({ items, id }) => {
  const newProjects = items.filter((item) => {
    return item._id !== id;
  });
  return [...newProjects];
};

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
    setProjectPageData: (state, action) => {
      let data = action.payload;
      state.projectPage.articles = [...data.articles];
      state.projectPage.project = data.project;
      state.projectPage.keywordList = [...data.keywordList];
    },
    removeArticle: (state, action) => {
      state.projectPage.articles = remove({
        items: state.projectPage.articles,
        id: action.payload.article_id,
      });
    },
    updateAKeyword: (state, action) => {
      state.projectPage.keywordList = update({
        items: state.projectPage.keywordList,
        id: action.payload.keywordList_id,
        updateObject: action.payload.updateObject,
      });
    },
    removeKeyword: (state, action) => {
      state.projectPage.keywordList = remove({
        items: state.projectPage.keywordList,
        id: action.payload.keywordList_id,
      });
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    updateAProject: (state, action) => {
      state.projects = update({
        items: state.projects,
        id: action.payload.project_id,
        updateObject: action.payload.updateObject,
      });
    },
    removeProject: (state, action) => {
      state.projects = remove({
        items: state.projects,
        id: action.payload.project_id,
      });
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
  removeArticle,
  removeProject,
  removeKeyword,
  updateAKeyword,
  updateAProject,
  setProjectPageData,
  setKeywordQuestions,
  setKeywordsStackAnalysed,
} = projectSlice.actions;

export { getAFeatureList };
