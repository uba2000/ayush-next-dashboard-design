import React from 'react'

function FormGroup({ labelFor, label, children, imp }) {
  return (
    <div className={`${imp ? 'form-group imp' : 'form-group'}`}>
      <label htmlFor={labelFor}>
        {label}
      </label>
      <div className="mt-3">
        {children}
      </div>
    </div>
  )
}

export default FormGroup