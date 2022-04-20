import React from 'react'

function FormGroup({ labelFor, label, children, className, imp }) {
  return (
    <div className={`${imp ? 'form-group imp' : 'form-group'} ${className}`}>
      <label htmlFor={labelFor} className="whitespace-nowrap">
        {label}
      </label>
      <div className="mt-3">
        {children}
      </div>
    </div>
  )
}

export default FormGroup