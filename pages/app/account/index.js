import React, { useState, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import AccountLayout from '../../../components/app/account/AccountLayout'
import FormGroup from '../../../components/app/account/FormGroup'
import styles from '../../../styles/Account.module.css'

const genders = ['male', 'female']

function index() {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addressH, setAddressH] = useState('');
  const [selectedDateValue, setSelectedDateValue] = useState(new Date())
  const [selectedGender, setSelectedGender] = useState(genders[1])


  return (
    <AccountLayout>
      <div className="">
        <FormGroup label='Full Name' labelFor='fullName'>
          <input id='fullName' type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Full Name' className={styles.formGroupInput} />
        </FormGroup>
        <FormGroup label='Email' labelFor='email'>
          <input id='email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className={styles.formGroupInput} />
        </FormGroup>
        <FormGroup label='Password' labelFor='password'>
          <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className={styles.formGroupInput} />
        </FormGroup>
        <div className="grid grid-cols-2 gap-3">
          <FormGroup label='Gender' labelFor='gender'>
            <Listbox as='div' id='gender' value={selectedGender} onChange={setSelectedGender}>
              {({ open }) => (
                <>
                  <div className="relative">
                    <span className="inline-block w-full">
                      <Listbox.Button className={styles.formGroupInput} style={{ paddingTop: '8.5px', paddingBottom: '8.5px' }}>
                        <span className='block truncate capitalize text-left'>{selectedGender}</span>
                        <span className='absolute right-4 top-[12px]'>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </Listbox.Button>
                    </span>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter='ease-out duration-300'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='transition ease-in duration-200'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <Listbox.Options static className='absolute w-full border bg-white border-gray-800'>
                        {genders.map((gender) => (
                          <Listbox.Option key={gender} value={gender}>
                            {({ selected, active }) => (
                              <div className={`capitalize cursor-pointer select-none relative py-2 pl-10 pr-4 transition ease-in duration-200  ${active ? 'text-white bg-primary' : 'text-black'}`}>
                                <span className={`${selected ? 'font-bold' : 'font-normal'}`}>{gender}</span>
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
          <FormGroup label='Date of Birth'>
            <div className="relative">
              <DatePicker
                selected={selectedDateValue}
                onChange={date => setSelectedDateValue(date)}
                dateFormat='dd MMMM yyyy'
                maxDate={new Date()}
                className={styles.formGroupInput}
              />
              <span className='absolute right-4 top-[12px] cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </FormGroup>
        </div>
        <FormGroup label='Address' labelFor='address'>
          <input id='address' type="text" value={addressH} onChange={(e) => setAddressH(e.target.value)} placeholder="Address" className={styles.formGroupInput} />
        </FormGroup>
        <div className="mt-7">
          <button className="btn btn-primary mr-7">
            Submit
          </button>
          <button className="btn btn-reset">
            Discard
          </button>
        </div>
      </div>
    </AccountLayout>
  )
}
export default index