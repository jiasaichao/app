import React, { Component } from 'react';
/**
 * style
 */
export function ImagePlaceholder({ width,height,background='09f',color='fff' }) {
  return <img style={{width,height}} src={`http://placehold.it/200x$200/${background}/${color}.png`} alt=""/>;
}