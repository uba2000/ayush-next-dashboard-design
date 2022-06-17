import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { useAppContext } from '../../../context/state';
import { PROJECTS_COLUNM } from '../../../components/layouts/Table/columns';
import { Settings } from '../../../ui/icons';
import DashboardLayout from '../../../components/app/DasboardLayout';
import DashboardLanding from '../../../components/app/DashboardLanding';
import SearchTable from '../../../components/layouts/Table/components/SearchTable';
import ProjectsIndexDialog from '../../../page-components/projects/ProjectsIndexDialog';
import useScaiTable from '../../../hooks/useScaiTable';
import TableLayout from '../../../components/layouts/TableLayout';
import { get, setHeaders } from '../../../utils/http';
import SearchInput from '../../../components/SearchInput';
import ProjectsIndexItemDialog from '../../../page-components/projects/ProjectsIndexItemDialog';
import { setShowNewProject } from '../../../features/layout/layoutSlice';
import { Button } from '../../../ui/button';

function AllProjects({ projects }) {
  const contextState = useAppContext();
  const router = useRouter();
  const dispatch = useDispatch();

  // const [allProjects, setAllProjects] = useState(projects);
  const [projectDialog, setProjectDialog] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const isShowNewProject = useSelector((state) => state.layout.showNewProject);

  useEffect(async () => {
    setTimeout(() => setProjectDialog(isShowNewProject), 200);

    return () => {
      dispatch(setShowNewProject(false));
      contextState.layout.setShowNewProject(false);
    };
  }, []);

  const openProjectDialog = () => {
    setProjectDialog(true);
  };

  const closeProjectDialog = () => {
    setProjectDialog(false);
  };

  const updateProjectChange = (_) => {
    // TODO: use https://codesandbox.io/s/zqxl6r190l?file=/reducers.js example to update projects
    router.reload();
  };

  const tableInstance = useScaiTable(
    {
      tableColumns: PROJECTS_COLUNM,
      tableData: projects,
    },
    [
      {
        Header: (
          <Settings className="mx-auto h-[18px] w-[18px] dark:text-white text-black" />
        ),
        Cell: ({ row }) => {
          return (
            <ProjectsIndexItemDialog
              reloadProjects={(payload) => updateProjectChange(payload)}
              item={row.original}
            />
          );
        },
      },
    ]
  );

  return (
    <DashboardLayout>
      <ProjectsIndexDialog
        projectDialog={projectDialog}
        closeProjectDialog={closeProjectDialog}
      />
      <DashboardLanding
        landingText="All Projects"
        oneChild={true}
        subLandingShort={true}
        subLandingText="I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean"
      >
        <div className="mt-12">
          <div className="flex justify-end mb-[21px]">
            <Button onClick={openProjectDialog}>New Project</Button>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="">
              <p className="text-left text-wild capitalize font-semibold font-poppins">
                All Projects
              </p>
            </div>
            <div className="flex items-center justify-end">
              <SearchTable
                filter={tableInstance.globalFilter}
                setFilter={tableInstance.setGlobalFilter}
              />
            </div>
          </div>
          <div className="mt-7">
            <TableLayout tableInstance={tableInstance} />
          </div>
        </div>
      </DashboardLanding>
    </DashboardLayout>
  );
}

AllProjects.auth = true;

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);

    if (session?.user) {
      const { response, error } = await get({
        url: `${process.env.BASE_URL}/api/project`,
        headers: setHeaders({ token: session.user.accessToken }),
      });
      if (response) {
        return {
          props: {
            projects: response.data.data,
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

export default AllProjects;
