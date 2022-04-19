import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Outer = styled.button.attrs((p) => ({
  type: p.type || 'button'
}))`
  color: #fff;
  border-radius: 5px;
  font-weight: 600;
  padding: 16px 25px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  font-family: Inter, sans-serif !important;
  &:focus, &:not(:disabled):not(.disabled):active, .btn-secondary.dropdown-toggle {
    color: initial !important;
    background-color: initial !important;
    border-color: initial !important;
    box-shadow: none !important;
  }
  a {
    display: block;
  }
`;

const Text = styled.span`
  white-space: nowrap;
`;

export const Button = React.forwardRef(
  ({ children, variant, isLink, link, ...rest }, ref) => (
    <Outer className={`btn ${variant}`} {...rest} ref={ref}>
      {!isLink ? (<Text>{children}</Text>) : (
        <Link href={link}>
          <a>
            <Text>{children}</Text>
          </a>
        </Link>
      )}
    </Outer>
  )
)

Button.displayName = 'Button';