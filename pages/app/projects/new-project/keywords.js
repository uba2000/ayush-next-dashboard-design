import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

import DashboardLayout from '../../../../components/app/DasboardLayout'
import DashboardLanding from '../../../../components/app/DashboardLanding'
import FormGroup from '../../../../components/FormGroup'

function keywords() {

  const router = useRouter()
  return (
    <DashboardLayout>
      <DashboardLanding
        oneChild={true}
        landingText='Please A Keyword'
        subLandingText='I am so lorem ipum deloas In working with you Lorem ipsum dolo amet, consectetur adipiscing elit Porta pharetra scelerisque lacus id vitae aenean'
      >
        <form action="">
          <FormGroup>
            <input type="text" className='w-full max-w-[560.14px] thick-border mx-auto focus:border-black' placeholder='Keywords: seo' />
          </FormGroup>
          <FormGroup>
            {/* <input type="submit" className='btn btn-primary w-fit bg-primary text-white' value='Generate' /> */}
            <Link href={`/app/projects/new-project/select-keywords?g=${router.query.g}`}>
              <a className="block mx-auto w-fit btn btn-primary bg-primary text-white font-poppins">
                Generate
              </a>
            </Link>
          </FormGroup>
        </form>
      </DashboardLanding>
    </DashboardLayout>
  )
}

export default keywords