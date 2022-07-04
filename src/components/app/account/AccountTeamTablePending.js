import React, { useState, useEffect, Fragment } from 'react';

import { Table } from '../../layouts/Table';
import AccountTeamItems from './AccountTeamItems';
import styles from '../../../styles/Account.module.css';
import Box from '../../layouts/Box';
import useUser from '../../../hooks/useUser';
import { setHeaders, get, post } from '../../../utils/http';
import { DialogLayout } from '../../layouts/Dialog';
import { Input } from '../../../ui/input';
import { Loader } from '../../layouts/Loader';
import { Button } from '../../../ui/button';
import AccountTeamsItemPending from './AccountTeamsItemPending';

function AccountTeamTablePending({ targetTeamBTN, closeModal }) {
  const { user } = useUser();

  const [teamMembers, setTeamMembers] = useState(false);

  const getTeamMembers = async () => {
    setTeamMembers(false);
    const { response, error } = await get({
      url: `${process.env.BASE_URL}/api/account/get-team-members`,
      headers: setHeaders({ token: user.accessToken }),
    });

    if (response.status) {
      setTeamMembers(response.data.data.pending);
    }
  };

  useEffect(() => {
    getTeamMembers();
  }, []);

  return (
    <>
      {!teamMembers || teamMembers.length == 0 ? (
        !teamMembers ? (
          <Box className="flex items-center justify-center w-full min-h-[142.5px]">
            <div className="text-center py-9">
              <Loader />
            </div>
          </Box>
        ) : (
          teamMembers.length == 0 && (
            <Box className="flex items-center justify-center w-full min-h-[295px]">
              <div className="text-center py-9">
                <span className="capitalize font-bold text-3xl">
                  There is no <br />
                  pending account
                </span>
              </div>
            </Box>
          )
        )
      ) : (
        <Table className="border-b">
          <Table.Head className="dark:bg-black bg-white">
            <Table.Row>
              <Table.TH className={'w-1/3'} style={{ width: '30%' }}>
                User Name
              </Table.TH>
              <Table.TH main={true} style={{ width: '50%' }}>
                Email
              </Table.TH>
              <Table.TH style={{ width: '20%', minWidth: '245.22px' }}>
                Status
              </Table.TH>
            </Table.Row>
          </Table.Head>
          <Table.Body className="dark:bg-black bg-white">
            {!teamMembers ? (
              <>
                <Table.Row>
                  <td colSpan="3" className="text-center py-3">
                    <Loader />
                  </td>
                </Table.Row>
              </>
            ) : (
              teamMembers.map((member) => (
                <Fragment key={member._id}>
                  <AccountTeamsItemPending member={member} />
                </Fragment>
              ))
            )}
          </Table.Body>
        </Table>
      )}
    </>
  );
}

export default AccountTeamTablePending;
