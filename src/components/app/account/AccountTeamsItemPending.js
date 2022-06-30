import React, { useState, Fragment } from 'react';
import { Listbox, Transition, Dialog, Menu } from '@headlessui/react';
import Link from 'next/link';

import { Table } from '../../layouts/Table';
import Box from '../../layouts/Box';
import { Button } from '../../../ui/button';

const roles = ['owner', 'admin', 'editor'];

function AccountTeamsItemPending({ member }) {
  const { email, role, full_name } = member;
  const [selectedRole, setSelectedRole] = useState(role);
  const [open, setOpen] = useState(false);

  return (
    <Table.Row>
      <Table.Data>
        <span className="line-clamp-1">{full_name}</span>
      </Table.Data>
      <Table.Data>
        <span className="lowercase">{email}</span>
      </Table.Data>
      <Table.Data>
        <span className="">Pending</span>
      </Table.Data>
    </Table.Row>
  );
}

export default AccountTeamsItemPending;
