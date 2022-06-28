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

function AccountTeamTable({ targetTeamBTN, closeModal, isOpen }) {
  const { user } = useUser();

  const [inviteEmail, setInviteEmail] = useState('');

  const [teamMembers, setTeamMembers] = useState(false);
  const [stateTargetTeamBTN, setStateTargetTeamBTN] = useState(targetTeamBTN);

  const [loading, setLoading] = useState(false);

  const getTeamMembers = async () => {
    setTeamMembers(false);
    const { response, error } = await get({
      url: `${process.env.BASE_URL}/api/account/get-team-members`,
      headers: setHeaders({ token: user.accessToken }),
    });

    if (response.status) {
      setTeamMembers(response.data.data);
    }
  };

  const inviteMember = async () => {
    if (inviteEmail && inviteEmail.includes('@')) {
      setLoading(true);
      const { response, error } = await post({
        url: `${process.env.BASE_URL}/api/account/invite-team-member`,
        data: {
          email: inviteEmail,
        },
        headers: setHeaders({ token: user.accessToken }),
      });

      if (response.status) {
        getTeamMembers();
        closeModal();
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeamMembers();
  }, []);

  return (
    <>
      <DialogLayout isOpen={isOpen} closeModal={closeModal}>
        <div className="py-[100px] px-[150px]">
          <div className="space-y-5">
            <DialogLayout.Title as="h3" className="title">
              Are you sure, you want to add this person in your account?
            </DialogLayout.Title>
            <div className="subtitle">
              <div className="form-group mb-6">
                <Input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e)}
                  placeholder="example@gmail.com"
                  className={`${styles.formGroupInput} text-center dark:bg-black`}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 space-x-3">
            <Button onClick={inviteMember} state={loading && 'loading'}>
              Confirm
            </Button>
            <Button variant="reset" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogLayout>
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
              Access Level
            </Table.TH>
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
                <AccountTeamItems member={member} />
              </Fragment>
            ))
          )}
        </Table.Body>
      </Table>
    </>
  );
}

export default AccountTeamTable;
