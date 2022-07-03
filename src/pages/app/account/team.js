import React, { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from '../../../styles/Account.module.css';
import AccountLayout from '../../../components/app/account/AccountLayout';
import AccountTeamTable from '../../../components/app/account/AccountTeamTable';
import Box from '../../../components/layouts/Box';
import { DialogLayout } from '../../../components/layouts/Dialog';
import { Input } from '../../../ui/input';
import useUser from '../../../hooks/useUser';
import { Button } from '../../../ui/button';
import { setHeaders, post } from '../../../utils/http';
import AccountTeamTablePending from '../../../components/app/account/AccountTeamTablePending';
import FieldErrorText from '../../../components/layouts/FieldErrorText';

function Team() {
  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [targetTeamBTN, setTargetTeamBTN] = useState('---');
  const [loading, setLoading] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const updateTabIndex = (index) => {
    setTabIndex(index);
  };

  const inviteMember = async (values, submitProps) => {
    setLoading(true);
    const { response, error } = await post({
      url: `${process.env.BASE_URL}/api/account/invite-team-member`,
      data: {
        email: values.email,
      },
      headers: setHeaders({ token: user.accessToken }),
    });

    if (response.status) {
      submitProps.resetForm();
      setTabIndex(0);
      setTabIndex(1);
      closeModal();
    }
    setLoading(false);
  };

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('invalid email').required('email is required'),
  });

  return (
    <>
      <DialogLayout isOpen={isOpen} closeModal={closeModal}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={inviteMember}
        >
          <Form className="py-[100px] px-[150px]">
            <div className="space-y-5">
              <DialogLayout.Title as="h3" className="title">
                Are you sure, you want to add this person in your account?
              </DialogLayout.Title>
              <div className="subtitle">
                <div className="form-group mb-6">
                  <Field
                    as={Input}
                    returnEvent={true}
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    className={`${styles.formGroupInput} text-center dark:bg-black`}
                  />
                  <ErrorMessage name="email" component={FieldErrorText} />
                </div>
              </div>
            </div>

            <div className="mt-8 space-x-3">
              <Button type="submit" state={loading && 'loading'}>
                Confirm
              </Button>
              <Button variant="reset" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </Form>
        </Formik>
      </DialogLayout>
      <AccountLayout metaTitle="Team Members">
        <Box type={'black'} className={styles.accountFramebox}>
          <h3 className={styles.accountFrameboxTitle}>Invite Team</h3>
          <p className={styles.accountFrameboxContent}>
            Invite others to join your workspace. There will be an additional
            charge of $30 month for each number that exceeds the user seats
            available on your plan
          </p>
          <Button onClick={openModal}>Invite Team</Button>
        </Box>
        <div className="">
          <Tab.Group
            selectedIndex={tabIndex}
            onChange={(index) => updateTabIndex(index)}
          >
            <Tab.List>
              <div className="accountFrameboxNav">
                <Tab as={Fragment}>
                  <Box
                    type={`${tabIndex == 0 ? 'black' : ''}`}
                    className={`accountFrameboxNavItem border-b-0 ${
                      tabIndex == 0 && 'accountFrameboxNavItemActive'
                    }`}
                  >
                    Confirmed
                  </Box>
                </Tab>
                <Tab as={Fragment}>
                  <Box
                    type={`${tabIndex == 1 ? 'black' : ''}`}
                    className={`accountFrameboxNavItem border-b-0 border-l-0 ${
                      tabIndex == 1 && 'accountFrameboxNavItemActive'
                    }`}
                  >
                    Pending
                  </Box>
                </Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="w-full h-auto min-h-[62.45px]">
                  <AccountTeamTable
                    targetTeamBTN={targetTeamBTN}
                    isOpen={isOpen}
                    closeModal={closeModal}
                  />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="w-full h-auto">
                  <AccountTeamTablePending />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </AccountLayout>
    </>
  );
}

Team.auth = true;

export default Team;
