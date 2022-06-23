import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import ScalingDots from '../components/layouts/ScalingDots';

const STATES = {
  LOADING: 'loading',
};

const Outer = styled.button.attrs((p) => ({
  type: p.type || 'button',
}))`
  position: relative;
`;

const Text = styled.span`
  color: inherit;
  position: relative;
  z-index: 2;
  transition: opacity 100ms, transform 100ms;
  white-space: nowrap;
  ${(props) =>
    !props.shown &&
    `
  opacity: 0;
  transform: scale(0.7);

  `}
`;

const Loading = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    height: 50%;
    width: auto;
  }
`;

export const Button = React.forwardRef(
  (
    { children, state, variant = 'primary', isLink, link, className, ...rest },
    ref
  ) => (
    <Outer
      disabled={state === STATES.LOADING}
      className={`btn btn-${variant} ${className ? className : ''}`}
      {...rest}
      ref={ref}
    >
      {!isLink ? (
        <>
          <Text shown={state !== STATES.LOADING}>{children}</Text>
          {state === STATES.LOADING && (
            <Loading>
              <ScalingDots />
            </Loading>
          )}
        </>
      ) : (
        <Link href={link}>
          <a>
            <Text>{children}</Text>
          </a>
        </Link>
      )}
    </Outer>
  )
);

Button.displayName = 'Button';
