import Link from 'next/link'
import React, { Component } from 'react'
import DashboardLayout from '../../../components/app/DasboardLayout'
import DashboardLanding from '../../../components/app/DashboardLanding'
import ProjectList from '../../../components/app/project/ProjectList'

export class AllProjects extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    const project = {
      title: 'Digtial Marketing Articles',
      tags: ['Graphic design', 'digital marketing'],
      date: '2 days ago',
      checked: false
    }
    let projects = []
    for (let i = 0; i < 40; i++) {
      projects.push(project)
    }
    this.setState({
      projects: projects
    })
  }

  render() {

    const { projects } = this.state;

    return (
      <DashboardLayout>
        <DashboardLanding
          landingText='All Projects'
          subLandingText='I am so lorem ipum deloas In deloas with deloas Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
        >
          <div className="mt-12">
            <div className="flex justify-end mb-8">
              <Link href='/app/projects/new-project'>
                <a className="block w-fit btn btn-primary bg-primary text-white font-poppins">
                  New Project
                </a>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="">
                <p className="text-left text-wild capitalize font-semibold font-poppins">
                  All Projects
                </p>
              </div>
              <div className="flex items-center justify-end">
                <p className="mr-4 text-wild capitalize font-semibold font-poppins">
                  Search
                </p>
                <input type="text" className="input-search max-w-[293px]" placeholder='How To...' />
              </div>
            </div>
            <ProjectList projects={projects} />
          </div>
        </DashboardLanding>
      </DashboardLayout>
    )
  }
}

export default AllProjects