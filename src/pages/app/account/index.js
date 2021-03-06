import React, { useState, Fragment } from 'react';
import { signOut } from 'next-auth/react';
import { Listbox, Transition, Menu } from '@headlessui/react';
import { getSession } from 'next-auth/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import AccountLayout from '../../../components/app/account/AccountLayout';
import FormGroup from '../../../components/app/account/FormGroup';
import styles from '../../../styles/Account.module.css';
import { Input } from '../../../ui/input';
import useUser from '../../../hooks/useUser';
import { setHeaders, post, get } from '../../../utils/http';
import Box from '../../../components/layouts/Box';
import { Button } from '../../../ui/button';

const genders = ['', 'male', 'female'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function index({ userDetails }) {
  const { user } = useUser();

  const [fullName, setFullName] = useState(userDetails.full_name);
  const [email, setEmail] = useState(userDetails.email);
  const [password, setPassword] = useState('');
  const [addressH, setAddressH] = useState(
    `${userDetails.address ? userDetails.address : ''}`
  );
  const [loading, setLoading] = useState(false);
  const [selectedDateValue, setSelectedDateValue] = useState(
    userDetails.dob ? new Date(userDetails.dob) : new Date()
  );
  const [showCalendar, updateShowCalendar] = useState(false);
  const [selectedGender, setSelectedGender] = useState(
    `${userDetails.gender ? userDetails.gender : genders[0]}`
  );

  const disabledDates = () => {
    let today, day, month, year;
    today = new Date();
    day = today.getDate() + 1;
    month = today.getMonth() + 1;
    year = today.getFullYear();
    return `${year} ${month} ${day}`;
  };

  const handleDateChange = (payload) => {
    setSelectedDateValue(new Date(payload));
    updateShowCalendar(false);
  };

  const updateSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    let updateObject = {};

    if (userDetails.full_name != fullName) {
      updateObject.fullName = fullName;
    }
    if (userDetails.gender != selectedGender) {
      updateObject.gender = selectedGender;
    }
    if (userDetails.dob != selectedDateValue) {
      updateObject.dob = selectedDateValue;
    }
    if (userDetails.address != addressH) {
      updateObject.address = addressH;
    }

    const { response, error } = await post({
      url: `${process.env.BASE_URL}/api/account/update-settings`,
      data: updateObject,
      headers: setHeaders({ token: user.accessToken }),
    });
    setLoading(false);
  };

  return (
    <AccountLayout metaTitle="Account Settings">
      <form className="" onSubmit={updateSettings}>
        <FormGroup label="Full Name" labelFor="fullName">
          <Input
            variant="dark"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e)}
            placeholder="Full Name"
            className={styles.formGroupInput}
          />
        </FormGroup>
        <FormGroup label="Email" labelFor="email">
          <Input
            id="email"
            variant="dark"
            type="email"
            value={email}
            disabled={true}
            placeholder="Email"
            className={styles.formGroupInput}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <Input
            id="password"
            variant="dark"
            type="password"
            value={password}
            onChange={(e) => setPassword(e)}
            placeholder="Password"
            className={styles.formGroupInput}
          />
        </FormGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormGroup label="Gender" labelFor="gender">
            <Listbox
              as="div"
              id="gender"
              value={selectedGender}
              onChange={setSelectedGender}
            >
              {({ open }) => (
                <>
                  <div className="relative">
                    <span className="inline-block w-full">
                      <Listbox.Button
                        className="w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border  border-ash  pl-6  py-3  rounded-none  h-[45px] bg-white dark:bg-black "
                        style={{ paddingTop: '8.5px', paddingBottom: '8.5px' }}
                      >
                        <span className="block truncate capitalize text-left">
                          {selectedGender != '' ? selectedGender : ''}
                        </span>
                        <span className="absolute right-4 top-[12px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </span>
                      </Listbox.Button>
                    </span>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options
                        static
                        className="absolute w-full dark:bg-black bg-white dark:text-white text-black border border-t-0 border-solid border-ash dark:border-darkMode-border"
                      >
                        {genders.map((gender) => (
                          <Listbox.Option key={gender} value={gender}>
                            {({ selected, active }) => (
                              <div
                                className={`${
                                  gender == '' ? 'hidden' : ''
                                } capitalize cursor-pointer select-none relative py-2 pl-10 pr-4 transition ease-in duration-200  ${
                                  active
                                    ? 'text-white bg-primary'
                                    : 'dark:text-white text-black'
                                }`}
                              >
                                <span
                                  className={`${
                                    selected ? 'font-bold' : 'font-normal'
                                  }`}
                                >
                                  {gender != ''
                                    ? gender
                                    : '--Choose your gender--'}
                                </span>
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </FormGroup>
          <FormGroup label="Date of Birth">
            <Menu as="div" className="block">
              {({ open }) => (
                <div className="relative">
                  <div>
                    <Menu.Button className="relative" as="div">
                      <div className="relative">
                        <Input
                          variant="dark"
                          type="text"
                          onChange={(e) =>
                            setSelectedDateValue(
                              selectedDateValue.toISOString().slice(0, 10)
                            )
                          }
                          value={`${selectedDateValue.getDate()} ${
                            months[selectedDateValue.getMonth()]
                          } ${selectedDateValue.getFullYear()}`}
                          className={styles.formDate}
                        />
                        <div className="absolute top-0 left-0 cursor-pointer w-full h-full"></div>
                      </div>
                      <span className="absolute right-4 top-[12px] cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="w-fit z-30 origin-top-right absolute left-0 mt-1 shadow-lg dark:bg-[#000000] dark:text-white text-black bg-white ring-1 ring-[#000000] ring-opacity-5 focus:outline-none">
                      <div className="divide-y-[1.27354px] divide-darkMode-border dark:text-white text-black">
                        <Menu.Item>
                          <Calendar
                            onChange={(e) => handleDateChange(e)}
                            value={selectedDateValue}
                            maxDate={new Date()}
                            className="absolute font-poppins"
                          />
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </div>
              )}
            </Menu>
            <div className="relative">
              <div
                onClick={() => updateShowCalendar(!showCalendar)}
                className="relative"
              ></div>
              {showCalendar && <></>}
            </div>
          </FormGroup>
        </div>
        <FormGroup label="Address" labelFor="address">
          <Input
            id="address"
            variant="dark"
            type="text"
            value={addressH}
            onChange={(e) => setAddressH(e)}
            placeholder="Address"
            className={styles.formGroupInput}
          />
        </FormGroup>
        <div className="mt-7 space-x-3">
          <Button type="submit" state={loading && 'loading'}>
            Submit
          </Button>
          <Button variant="reset">Discard</Button>
        </div>
      </form>
    </AccountLayout>
  );
}

index.auth = true;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    if (session?.user) {
      let details = {};
      const { response, error } = await get({
        url: `${process.env.BASE_URL}/api/account/get-account-details`,
        headers: setHeaders({ token: session.user.accessToken }),
      });

      if (response.status) {
        details = response.data.data;
        return {
          props: {
            userDetails: details.user,
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

export default index;
