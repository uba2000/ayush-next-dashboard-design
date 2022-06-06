import React, { useState, Fragment, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import DashboardLayout from '../../../../../components/app/DasboardLayout';
import DashboardLanding from '../../../../../components/app/DashboardLanding';
import Box from '../../../../../components/layouts/Box';
import { DialogLayout } from '../../../../../components/layouts/Dialog';
import { Plus, X, XSolid, Tick } from '../../../../../ui/icons';
import Input from '../../../../../components/layouts/Input';
import { fQue } from '../../../../../utils/formatQuestions';
import { useProjectsContext } from '../../../../../context/projects';
import { aQuestions } from '../../../../../utils/analyseQuestions';
import ScrollbarsLayout from '../../../../../components/layouts/Scrollbars';

function KeywordsPage() {
  const { data: user } = useSession();

  const router = useRouter();
  const { query } = router;
  const projectsState = useProjectsContext();
  const { keywordQuestions, keywordsStackAnalysed, setKeywordsStackAnalysed } =
    projectsState;

  const [errorDialog, setErrorDialog] = useState(false);
  const [isNewKeyword, setIsNewKeyword] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [questions, setQuestions] = useState(keywordQuestions);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const openErrorDialog = () => {
    setErrorDialog(true);
  };

  const closeErrorDialog = () => {
    setErrorDialog(false);
  };

  const CSVButton = useRef(null);

  const showNewKeywordInput = () => {
    setNewKeyword('');
    setIsNewKeyword(true);
  };

  const saveNewKeywordInput = async () => {
    if (checkKeywordValid()) {
      setLoadingQuestions(true);

      try {
        setKeywordsStackAnalysed([...keywordsStackAnalysed, newKeyword]);
        const { data } = await axios.post('/api/questions', {
          keyword: newKeyword,
          accessToken: user.user.accessToken,
        });

        if (data.success) {
          if (!checkQuestionLength) {
            const newQuestions = fQue(data.questions);
            setQuestions(newQuestions);
          } else {
            const addQues = fQue([...data.questions]);
            setQuestions([...questions, ...addQues]);
          }
          setNewKeyword('');
        }
        setLoadingQuestions(false);
      } catch (error) {
        console.log(error);
      }
    }
    setIsNewKeyword(false);
  };

  const removeQuestion = (id) => {
    let newQuestions = questions.filter((n) => n.id != id);
    projectsState.setKeywordQuestions(aQuestions(newQuestions));
    setQuestions(newQuestions);
  };

  const checkKeywordValid = () => newKeyword.length > 1;
  const checkQuestionLength = () => questions.length > 0;

  const clickCSVImport = () => {
    if (errorDialog) {
      closeErrorDialog();
    }
    CSVButton.current.click();
  };

  const handleCSVImport = (e) => {
    if (e.target.files[0].type !== 'application/csv') {
      CSVButton.current.form.reset();
      openErrorDialog();
    }
  };

  const handleKeywordAnalysis = () => {
    if (checkQuestionLength) {
      projectsState.setKeywordQuestions(aQuestions(questions));
      router.push(`/app/projects/${query.projectId}/keywords/results`);
    }
  };

  return (
    <DashboardLayout>
      <DialogLayout isOpen={errorDialog} closeModal={closeErrorDialog}>
        <div className="md:px-[130px] px-4 py-20 relative">
          <div
            className="absolute top-[30px] right-7 cursor-pointer"
            onClick={closeErrorDialog}
          >
            <span>
              <X className="w-[21px] h-[21px]" />
            </span>
          </div>
          <div className="space-y-6">
            <div className="mb-[26.85px]">
              <span>
                <XSolid className="w-[55.3px] h-[55.3px] mx-auto text-red" />
              </span>
            </div>
            <div className="space-y-2">
              <DialogLayout.Title
                className={'capitalize text-xl font-semibold'}
              >
                Something went wrong
              </DialogLayout.Title>
              <p className="dark:text-darkMode-subText text-ash">
                You have uploaded an invalid file type, please try to upload CVS
                File, in order to upload keyword list
              </p>
            </div>
            <div className="space-x-4">
              <button onClick={clickCSVImport} className="btn btn-primary">
                Upload another File
              </button>
              <button
                onClick={closeErrorDialog}
                className="btn btn-reset dark:text-darkMode-subText text-ash"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </DialogLayout>
      <DashboardLanding
        oneChild={true}
        landingText="Provide Keywords"
        subLandingShort={true}
        subLandingText="I am so lorem ipum deloas In working with you Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean"
      >
        <div className="space-y-4 mt-[55px]">
          <ScrollbarsLayout h="597px">
            <Box className={`min-h-[532px] py-6 md:px-7 px-4 rounded-sm`}>
              <div className="flex flex-wrap">
                {loadingQuestions ? (
                  <>
                    <span className="flex items-center pr-4 mb-[11px]">
                      Loading...
                    </span>
                  </>
                ) : (
                  <>
                    {questions.map((k) => (
                      <Fragment key={k.id}>
                        <Box
                          type={'black'}
                          className="p-2 text-left w-fit min-w-fit mb-[11px] mr-2"
                        >
                          <div className="flex space-x-[6px]">
                            <span className="font-medium text-sm line-clamp-2">
                              {k.question}
                            </span>
                            <span
                              onClick={() => removeQuestion(k.id)}
                              className="cursor-pointer flex items-center"
                            >
                              <XSolid className="w-[14px] h-[14px]" />
                            </span>
                          </div>
                        </Box>
                      </Fragment>
                    ))}
                  </>
                )}
                {isNewKeyword && (
                  <Fragment>
                    <Box
                      type={'black'}
                      className="pr-2 w-fit min-w-fit mb-[11px] mr-2 h-[38px]"
                    >
                      <div className="flex space-x-[6px]">
                        <span className="font-medium text-sm">
                          <Input
                            autoFocus
                            value={newKeyword}
                            placeholder="Enter keyword"
                            onChange={(e) => setNewKeyword(e.target.value)}
                            className="text-sm font-medium py-1 px-2 h-[35px] border-0"
                          />
                        </span>
                        <span
                          onClick={saveNewKeywordInput}
                          className="cursor-pointer flex items-center"
                        >
                          {checkKeywordValid() ? (
                            <div className="pop-in-animation">
                              <Tick className="w-[14px] h-[14px]" />
                            </div>
                          ) : (
                            <div className="pop-in-animation">
                              <XSolid className="w-[14px] h-[14px]" />
                            </div>
                          )}
                        </span>
                      </div>
                    </Box>
                  </Fragment>
                )}
                <div className="cursor-pointer mb-[11px] flex items-center">
                  <span onClick={showNewKeywordInput}>
                    <Plus className="w-[19px] h-[19px] text-primary" />
                  </span>
                </div>
              </div>
            </Box>
          </ScrollbarsLayout>
          <Box className={'py-6 md:px-[59px] px-4'}>
            <div className="flex md:justify-between md:flex-row md:space-y-0 space-y-4 flex-col">
              <button className="btn max-w- btn-primary bg-black border border-solid border-ash dark:border-darkMode-border">
                Go Back
              </button>
              <div className="md:space-x-4 justify-between flex">
                <form className="relative">
                  <button
                    type="button"
                    onClick={clickCSVImport}
                    className="btn btn-reset text-sm dark:text-white text-black"
                  >
                    Import CSV
                  </button>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVImport}
                    ref={CSVButton}
                    name="keywordCSV"
                    id="keyword-csv"
                    className="absolute w-full h-full hidden left-0 top-0"
                  />
                </form>
                <button
                  onClick={handleKeywordAnalysis}
                  className="btn btn-primary"
                >
                  Start Analysis
                </button>
              </div>
            </div>
          </Box>
        </div>
      </DashboardLanding>
    </DashboardLayout>
  );
}

KeywordsPage.auth = true;

export default KeywordsPage;
