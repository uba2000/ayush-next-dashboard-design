import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import draftToHtml from 'draftjs-to-html';

import ArticleLayout from '../../../../../../page-components/project-categories/ArticleLayout';
import DashboardLayout from '../../../../../../components/app/DasboardLayout';
import styles from '../../../../../../styles/Article.module.css';
import accountStyles from '../../../../../../styles/Account.module.css';
import { AppContext } from '../../../../../../context/state';
import Box from '../../../../../../components/layouts/Box';
import ArticleEditor from '../../../../../../page-components/project-categories/articles/ArticleEditor';
import Input from '../../../../../../components/layouts/Input';
import EditorContainer from '../../../../../../components/layouts/EditorContainer';
import { post, get, setHeaders } from '../../../../../../utils/http';
import { Button } from '../../../../../../ui/button';

class EditArticle extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    const _this = this;
    this.state = {
      titleChange: false,
      tagsChange: false,
      title: _this.props.article.title,
      reserveTitle: _this.props.article.title,
      tags: _this.props.article.tags.join(', '),
      reserveTags: _this.props.article.tags.join(', '),
      stateArticleContent: _this.props.article.article_content,
      showEditor: false,
      stats: {
        wordCount: 1000,
        plagiarism: 0,
        density: 96,
        fluency: 98,
      },
    };
  }

  setStateArticleContent(article) {
    this.setState({
      stateArticleContent: article,
    });
  }

  showEditorHandler = () => {
    this.setState((prevState) => {
      return {
        showEditor: !prevState.showEditor,
      };
    });
  };

  saveArticle = () => {
    this.showEditorHandler();
  };

  handleEditorContent = (content) => {
    this.setState({
      stateArticleContent: content,
    });
  };

  handleArticleUpdate = async (field, value) => {
    let updateObject = {};
    updateObject.article_id = this.props.router.query.id;
    updateObject[field] = value;

    try {
      await post({
        url: `${process.env.BASE_URL}/api/project/article/update-article`,
        headers: setHeaders({ token: this.props.user.accessToken }),
        data: updateObject,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { titleChange, tagsChange, showEditor, stateArticleContent } =
      this.state;
    const { layout } = this.context;
    const { router } = this.props;

    if (layout.toEditArticle && (!titleChange || !tagsChange || !showEditor)) {
      this.setState({
        titleChange: true,
        tagsChange: true,
        showEditor: true,
      });
      // layout.setToEditArticle(false)
    }

    const body = draftToHtml(JSON.parse(stateArticleContent));

    return (
      <DashboardLayout metaTitle={`${this.state.title}`}>
        <ArticleLayout
          crumbs={[
            {
              txt: 'Articles',
              link: `/app/projects/${router.query.projectId}`,
            },
            { txt: this.state.title },
          ]}
        >
          <div className="mt-16">
            <div className="grid md:grid-cols-[auto_auto] grid-cols-1 gap-4 mb-6">
              <div className="flex flex-col">
                {!titleChange ? (
                  <>
                    <div className="flex mb-2">
                      <div className="mr-2">
                        <h3 className={styles.articleEditHeaderTitle}>
                          {this.state.title}
                        </h3>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          this.setState({ titleChange: true });
                        }}
                      >
                        {/* pencil */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-pencil ml-2"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1"
                          stroke="white"
                          fill="#00A141"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                          <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid md:grid-cols-[auto_auto] grid-cols-1 gap-2 mb-2">
                      <div className="">
                        <Input
                          type="text"
                          value={this.state.title}
                          onChange={(e) =>
                            this.setState({ title: e.target.value })
                          }
                          className={accountStyles.formGroupInput}
                          style={{ minWidth: '273.6px', height: '53px' }}
                        />
                      </div>
                      <div className="flex">
                        <Button
                          onClick={() => {
                            this.setState({ titleChange: false });
                            layout.setToEditArticle(false);
                            this.handleArticleUpdate('title', this.state.title);
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="reset"
                          onClick={() => {
                            this.setState({ title: this.state.reserveTitle });
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  </>
                )}
                {!tagsChange ? (
                  <>
                    <div className="flex">
                      <div className="mr-2">
                        <h5 className={styles.articleEditHeaderTags}>
                          {this.state.tags}
                        </h5>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          this.setState({ tagsChange: true });
                        }}
                      >
                        {/* pencil */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-pencil ml-2"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          strokeWidth="1"
                          stroke="white"
                          fill="#00A141"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                          <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid md:grid-cols-[auto_auto] grid-cols-1 gap-2 mb-2">
                      <div className="">
                        <Input
                          type="text"
                          value={this.state.tags}
                          onChange={(e) =>
                            this.setState({ tags: e.target.value })
                          }
                          className={accountStyles.formGroupInput}
                          style={{ minWidth: '273.6px', height: '53px' }}
                        />
                      </div>
                      <div className="flex">
                        <Button
                          onClick={() => {
                            this.setState({ tagsChange: false });
                            layout.setToEditArticle(false);
                            this.handleArticleUpdate(
                              'tags',
                              this.state.tags.split(', ')
                            );
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="reset"
                          className="btn btn-reset"
                          onClick={() => {
                            this.setState({ tags: this.state.reserveTags });
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-end items-end">
                <span className="text-xs text-right font-medium">
                  1682 Words
                </span>
              </div>
            </div>
            <Box
              type="black"
              className={`generator-container relative ${
                !showEditor ? 'md:pt-[25px] pt-[70px] md:px-[70px] px-4' : ''
              }  pb-[25px]`}
            >
              <EditorContainer>
                {!showEditor ? (
                  <div dangerouslySetInnerHTML={{ __html: body }}></div>
                ) : (
                  <ArticleEditor
                    content={stateArticleContent}
                    handleContent={this.handleEditorContent}
                  />
                )}
              </EditorContainer>
              {!showEditor ? (
                <div
                  className="absolute top-6 right-6 cursor-pointer"
                  onClick={this.showEditorHandler}
                >
                  {/* pencil */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-pencil"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="white"
                    fill="#00A141"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                    <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                  </svg>
                </div>
              ) : (
                <div className="absolute right-7 top-3 flex items-center space-x-2">
                  <Button
                    variant="outline"
                    className="text-[13px] py-[11px] px-5 leading-5"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      this.setState({ showEditor: false });
                      layout.setToEditArticle(false);
                      this.handleArticleUpdate(
                        'newContent',
                        stateArticleContent
                      );
                    }}
                  >
                    Save article
                  </Button>
                </div>
              )}
            </Box>
            <div className="md:flex grid grid-cols-1 gap-5 mt-6 md:justify-end">
              {!showEditor && (
                <>
                  <Button>
                    Publish to Wordpress
                  </Button>
                </>
              )}
            </div>
          </div>
        </ArticleLayout>
      </DashboardLayout>
    );
  }
}

export async function getServerSideProps(context) {
  try {
    const { query } = context;

    const session = await getSession(context);

    if (session?.user) {
      const { response, error } = await get({
        url: `${process.env.BASE_URL}/api/project/article/${query.id}`,
        headers: setHeaders({ token: session.user.accessToken }),
      });
      if (response) {
        return {
          props: {
            article: JSON.parse(JSON.stringify(response.data.data)),
            user: session.user,
          },
        };
      }
    }
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
}

EditArticle.auth = true;
export default withRouter(EditArticle);
