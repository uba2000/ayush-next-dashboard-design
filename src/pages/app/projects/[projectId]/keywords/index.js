import React, { useState, Fragment, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import DashboardLayout from '../../../../../components/app/DasboardLayout';
import DashboardLanding from '../../../../../components/app/DashboardLanding';
import Box from '../../../../../components/layouts/Box';
import { DialogLayout } from '../../../../../components/layouts/Dialog';
import { Plus, X, XSolid, Tick } from '../../../../../ui/icons';
import { Input } from '../../../../../ui/input';
import { fQue } from '../../../../../utils/formatQuestions';
import { useProjectsContext } from '../../../../../context/projects';
import { aQuestions } from '../../../../../utils/analyseQuestions';
import ScrollbarsLayout from '../../../../../components/layouts/Scrollbars';
import { post, setHeaders } from '../../../../../utils/http';
import useUser from '../../../../../hooks/useUser';
import { Button } from '../../../../../ui/button';

function KeywordsPage() {
  const { user } = useUser();

  const keywordBody = useRef(null);

  const router = useRouter();
  const { query } = router;
  const projectsState = useProjectsContext();
  const { keywordQuestions, keywordsStackAnalysed, setKeywordsStackAnalysed } =
    projectsState;

  const [errorDialog, setErrorDialog] = useState(false);
  const [isNewKeyword, setIsNewKeyword] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingSaveAnalyze, setLoadingSaveAnalyze] = useState(false);

  const openErrorDialog = () => {
    setErrorDialog(true);
  };

  const closeErrorDialog = () => {
    setErrorDialog(false);
  };

  const CSVButton = useRef(null);
  const CSVForm = useRef(null);

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
          accessToken: user.accessToken,
        });

        if (data.success) {
          if (!checkQuestionLength()) {
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

  const handleCSVImport = async (e) => {
    if (e.target.files[0].type !== 'text/csv') {
      CSVButton.current.form.reset();
      openErrorDialog();
      CSVForm.current.reset();
      return;
    }
    setLoadingCSV(true);
    // extract keywords...
    await onChangeImportCSV(e.target.files);
  };

  const onChangeImportCSV = (csvFile) => {
    return new Promise((resolve, reject) => {
      let fileArr = [];
      if (window.FileReader) {
        let reader = new FileReader();

        reader.readAsText(csvFile[0]);

        // Columns
        // [0] -> #
        // [1] -> Keyword
        // [2] -> Country
        // [3] -> Difficulty
        // [4] -> Volume
        // [5] -> CPC
        // [6] -> CPS
        // [7] -> Parent Keyword
        // [8] -> Last Update
        // [9] -> SERP Features
        // [10] -> Global Volume
        // [11] -> Traffic Potential
        reader.onload = function (event) {
          let csv = event.currentTarget.result;
          let rows = csv.split(/\r\n|\n/);

          for (let i = 0; i < rows.length; i++) {
            let row = rows[i].split(/\t/);
            let col = [];

            for (let j = 0; j < row.length; j++) {
              col.push(row[j].split(/\"/)[1]);
            }

            // contains all rows arranged in column order
            fileArr.push(col);
          }
          // First [0] item in 'fileArr' are the header columns
          let header = fileArr[0];

          // get all keywords [1]
          let CSVKeywords = [];
          for (let k = 1; k < fileArr.length; k++) {
            // TODO: store keywords for this research
            // setKeywordsStackAnalysed([...keywordsStackAnalysed, fileArr[k][1]]);
            CSVKeywords.push(`${fileArr[k][1]}Search for:${fileArr[k][7]}`);
          }
          if (!checkQuestionLength()) {
            const newQuestions = fQue(CSVKeywords);
            setQuestions(newQuestions);
          } else {
            const addQues = fQue([...CSVKeywords]);
            setQuestions([...questions, ...addQues]);
          }

          setLoadingCSV(false);
          CSVForm.current.reset();
          resolve();
        };
      }
    });
  };

  const handleKeywordAnalysis = async () => {
    if (checkQuestionLength()) {
      try {
        setLoadingSaveAnalyze(true);
        if (!query.keywordsId) {
          const { response, error } = await post({
            url: `${process.env.BASE_URL}/api/project/add-keywords`,
            headers: setHeaders({ token: user.accessToken }),
            data: {
              title: 'Keyword List Title',
              industry: '',
              tags: [],
              keywords: keywordsStackAnalysed,
              keywordsQuestions: aQuestions(questions),
              project_id: query.projectId,
            },
          });

          if (response) {
            projectsState.setKeywordQuestions(aQuestions(questions));
            router.push(
              `/app/projects/${query.projectId}/keywords/${response.data.data._id}/results`
            );
          } else if (error) {
            setLoadingSaveAnalyze(false);
          }
        } else {
          const { response, error } = await post({
            url: `${process.env.BASE_URL}/api/project/update-keywords`,
            headers: setHeaders({ token: user.accessToken }),
            data: {
              keywordId: query.keywordsId,
              keywordsQuestions: aQuestions(questions),
              keywords: keywordsStackAnalysed,
            },
          });

          if (response) {
            projectsState.setKeywordQuestions(aQuestions(questions));
            router.push(
              `/app/projects/${query.projectId}/keywords/${query.keywordsId}/results`
            );
          }
        }
      } catch (error) {
        console.log(error);
        setLoadingSaveAnalyze(false);
      }
    }
  };

  const listenToSaveKeyword = (e) => {
    const keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode == '13') {
      if (checkKeywordValid()) {
        saveNewKeywordInput();
      }
    } else if (keycode == '27') {
      setIsNewKeyword(false);
    }
  };

  const openSHowNewKeywordFromBody = (e) => {
    if (e.target == keywordBody.current) showNewKeywordInput();
  };

  return (
    <DashboardLayout metaTitle="Provide Keywords">
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
              <Button onClick={clickCSVImport}>Upload another File</Button>
              <Button
                variant="reset"
                onClick={closeErrorDialog}
                className="dark:text-darkMode-subText text-ash"
              >
                Cancel
              </Button>
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
          <Box className={``}>
            <ScrollbarsLayout h="597px">
              <div
                className="min-h-full py-6 md:pl-7 pr-48 px-4 rounded-sm cursor-text"
                onClick={openSHowNewKeywordFromBody}
                id="keywordBody"
                ref={keywordBody}
              >
                <div className="flex flex-wrap">
                  {questions.map((k) => (
                    <Fragment key={k.id}>
                      <Box
                        type={'black'}
                        className="p-2 text-left w-fit min-w-fit mb-[11px] mr-2 cursor-default"
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
                  {loadingQuestions && (
                    <>
                      <span className="flex items-center pr-4 mb-[11px]">
                        Loading...
                      </span>
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
                              onKeyDown={listenToSaveKeyword}
                              autoFocus
                              value={newKeyword}
                              placeholder="Enter keyword"
                              onChange={(e) => setNewKeyword(e)}
                              className="text-sm dark:bg-black bg-white font-medium py-1 px-2 h-[35px] border-0"
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
              </div>
            </ScrollbarsLayout>
          </Box>
          <Box className={'py-6 md:px-[59px] px-4'}>
            <div className="flex md:justify-between md:flex-row md:space-y-0 space-y-4 flex-col">
              <button
                onClick={() => router.back()}
                className="btn max-w- btn-primary bg-black border border-solid border-ash dark:border-darkMode-border"
              >
                Go Back
              </button>
              <div className="md:space-x-4 justify-between flex">
                <form ref={CSVForm} className="relative">
                  <Button
                    variant="reset"
                    onClick={clickCSVImport}
                    className="text-sm"
                    state={loadingCSV && 'loading'}
                  >
                    Import CSV
                  </Button>
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
                <Button
                  onClick={handleKeywordAnalysis}
                  state={loadingSaveAnalyze && 'loading'}
                >
                  Start Analysis
                </Button>
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
