import React from 'react';

export const Switch = ({ children, activeValue }) => {
  if(!children) return;

  if(!activeValue) {
    throw new Error('Switch component must have activeValue props');
  }

  let matchingCase;
  let defaultCase;

  React.Children.forEach(children, (child) => {
    if(!React.isValidElement(child)) {
      return null;
    }

    if(!matchingCase && child.type.name === 'Case') {
      const { value } = child.props;
      if(value === activeValue) {
        matchingCase = child;
      }
    }else if(!defaultCase && child.type.name === 'Default') {
      defaultCase = child;
    }
  });

  return matchingCase ?? defaultCase ?? null;
};
