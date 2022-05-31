import React, { useState, useEffect, Fragment } from 'react'

import { Table } from '../../layouts/Table'
import AccountTeamItems from './AccountTeamItems'
import styles from '../../../styles/Account.module.css'
import Box from '../../layouts/Box'
import useUser from '../../../hooks/useUser'
import { setHeaders, get } from '../../../utils/http'

function AccountTeamTable() {

  const { user } = useUser()

  const [teamMembers, setTeamMembers] = useState([])

  const getTeamMembers = async () => {
    const { response, error } = await get({
      url: `${process.env.BASE_URL}/api/account/get-team-members`,
      headers: setHeaders({ token: user.accessToken }),
    });

    if (response.status) {
      setTeamMembers(response.data.data);
    }
  }

  useEffect(() => {
    getTeamMembers();
  }, [])

  return (
    <Table className='border-b'>
      <Table.Head className="dark:bg-black bg-white">
        <Table.Row>
          <Table.TH className={'w-1/3'} style={{ width: '30%' }}>User Name</Table.TH>
          <Table.TH main={true} style={{ width: '50%' }}>Email</Table.TH>
          <Table.TH style={{ width: '20%', minWidth: '245.22px' }}>Access Level</Table.TH>
        </Table.Row>
      </Table.Head>
      <Table.Body className="dark:bg-black bg-white">
        <Table.Row>
          <Table.Data>
            <span className={'line-clamp-1'}>{user.fullName}</span>
          </Table.Data>
          <Table.Data>
            <span className="lowercase line-clamp-1">{user.email}</span>
          </Table.Data>
          <Table.Data>
            <Box className="text-center max-w-[146px] py-1 px-9 mr-7 leading-7">
              Owner
            </Box>
          </Table.Data>
        </Table.Row>
        {teamMembers.length == 0 ? (
          <>
            <Table.Row>
              <td colSpan="3" className="text-center py-3">
                <div
                  className="spinning-loader w-9 h-9 mx-auto"
                  role="status"
                ></div>
              </td>
            </Table.Row>
          </>
        ) : (
          teamMembers.map((member) => (
            <Fragment key={member._id}>
              <AccountTeamItems member={member} />
            </Fragment>
          ))
        )}
      </Table.Body>
    </Table>
  )
}

export default AccountTeamTable