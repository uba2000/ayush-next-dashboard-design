import React from 'react'
import styles from '../../../styles/Account.module.css'

function FormGroup({ labelFor, label, children, imp }) {
  return (
    <div className={`${imp ? 'form-group imp' : 'form-group'}`}>
      <label htmlFor={labelFor} className={styles.formGroupLabel}>
        {label}
      </label>
      <div className="mt-3">
        {children}
      </div>
    </div>
  )
}

export default FormGroup