import React, { useState, Fragment } from 'react';
import { signOut } from 'next-auth/react';
import { Listbox, Transition } from '@headlessui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import AccountLayout from '../../../components/app/account/AccountLayout';
import FormGroup from '../../../components/app/account/FormGroup';
import styles from '../../../styles/Account.module.css';
import Input from '../../../components/layouts/Input';
import useUser from '../../../hooks/useUser';
import { setHeaders, post } from '../../../utils/http';
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

function index() {
  const { user } = useUser();

  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [addressH, setAddressH] = useState(
    `${user.address ? user.address : ''}`
  );
  const [loading, setLoading] = useState(false);
  const [selectedDateValue, setSelectedDateValue] = useState(
    user.dob ? new Date(user.dob) : new Date()
  );
  const [showCalendar, updateShowCalendar] = useState(false);
  const [selectedGender, setSelectedGender] = useState(
    `${user.gender ? user.gender : genders[0]}`
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

    if (user.fullName !== fullName) {
      updateObject.fullName = fullName;
    }
    if (user.gender != selectedGender) {
      updateObject.gender = selectedGender;
    }
    if (user.dob != selectedDateValue) {
      updateObject.dob = selectedDateValue;
    }
    if (user.address != addressH) {
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
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className={styles.formGroupInput}
          />
        </FormGroup>
        <FormGroup label="Email" labelFor="email">
          <Input
            id="email"
            type="text"
            value={email}
            disabled={true}
            placeholder="Email"
            className={styles.formGroupInput}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
                          {selectedGender != ''
                            ? selectedGender
                            : '--Choose your gender--'}
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
                                className={`capitalize cursor-pointer select-none relative py-2 pl-10 pr-4 transition ease-in duration-200  ${
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
            <div className="relative">
              <div
                onClick={() => updateShowCalendar(!showCalendar)}
                className="relative"
              >
                <div className="relative">
                  <Input
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
              </div>
              {showCalendar && (
                <Calendar
                  onChange={(e) => handleDateChange(e)}
                  value={selectedDateValue}
                  maxDate={new Date()}
                  className="absolute font-poppins"
                />
              )}
            </div>
          </FormGroup>
        </div>
        <FormGroup label="Address" labelFor="address">
          <Input
            id="address"
            type="text"
            value={addressH}
            onChange={(e) => setAddressH(e.target.value)}
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
export default index;
