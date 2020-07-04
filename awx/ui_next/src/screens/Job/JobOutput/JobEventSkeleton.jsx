import React from 'react';

import {
  JobEventLine,
  JobEventLineNumber,
  JobEventLineText,
  JobEventLineToggle,
} from './shared';

function JobEventSkeletonContent({ contentLength }) {
  return (
    <JobEventLineText>
      <span className="content">{' '.repeat(contentLength)}</span>
    </JobEventLineText>
  );
}

function JobEventSkeleton({ counter, contentLength, style }) {
  return (
    counter > 1 && (
      <div style={style}>
        <JobEventLine key={counter}>
          <JobEventLineToggle />
          <JobEventLineNumber />
          <JobEventSkeletonContent contentLength={contentLength} />
        </JobEventLine>
      </div>
    )
  );
}

export default JobEventSkeleton;
