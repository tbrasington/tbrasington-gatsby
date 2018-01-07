import React from 'react'

export default ({ content }) => <div>{content}</div>;
export const HTMLContent = ({ content }) => <div
  dangerouslySetInnerHTML={{ __html: content }}
/>;