import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const invoice = {
  date: '6 december 2021',
  amount: 60,
}

let invoices = []

for (let i = 0; i < 40; i++) {
  invoices.push({ id: `AH${faker.datatype.uuid()}`, ...invoice })
}

export default invoices;