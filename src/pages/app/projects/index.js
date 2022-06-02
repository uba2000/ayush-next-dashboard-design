import React, { useState, useEffect } from 'react'

import { useAppContext } from '../../../context/state'
import { PROJECTS_COLUNM } from '../../../components/layouts/Table/columns'
import Projects from '../../../_mock/projects'
import DashboardLayout from '../../../components/app/DasboardLayout'
import DashboardLanding from '../../../components/app/DashboardLanding'
import SearchTable from '../../../components/layouts/Table/components/SearchTable'
import ProjectsIndexDialog from '../../../page-components/projects/ProjectsIndexDialog'
import useScaiTable from '../../../hooks/useScaiTable'
import TableLayout from '../../../components/layouts/TableLayout'

function AllProjects() {

  const contextState = useAppContext()

  const [projects, setProjects] = useState(Projects)
  const [projectDialog, setProjectDialog] = useState(false)

  useEffect(() => {
    setTimeout(() => setProjectDialog(contextState.layout.showNewProject), 200)

    return () => {
      contextState.layout.setShowNewProject(false)
    }
  }, [])

  const openProjectDialog = () => {
    setProjectDialog(true)
  }

  const closeProjectDialog = () => {
    setProjectDialog(false)
  }

  const tableInstance = useScaiTable({
    tableColumns: PROJECTS_COLUNM,
    tableData: projects
  })

  return (
    <DashboardLayout>
      <ProjectsIndexDialog projectDialog={projectDialog} closeProjectDialog={closeProjectDialog} />
      <DashboardLanding
        landingText='All Projects'
        oneChild={true}
        subLandingShort={true}
        subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
      >
        <div className="mt-12">
          <div className="flex justify-end mb-[21px]">
            <button type='button' onClick={openProjectDialog} className="block w-fit btn btn-primary bg-primary text-white">
              New Project
            </button>
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
          <TableLayout
            tableInstance={tableInstance}
          />
        </div>
      </DashboardLanding>
    </DashboardLayout>
  )
}

AllProjects.auth = true

export default AllProjects