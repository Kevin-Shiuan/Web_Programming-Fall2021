import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Paper, Typography } from '@mui/material';

export default function TripTimeline() {
  return (
    <React.Fragment>
      <Timeline>

        <TimelineItem>
          <TimelineOppositeContent sx={{ pt: 3, px: 2 }}>
              <Typography variant='subtitle2'>
                01/02/2022
              </Typography>
              <Typography variant='caption'>
                09:30 am
              </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator sx={{ pt: 2}}>
            <TimelineDot />
            <TimelineConnector sx={{minHeight: 60}}/>
          </TimelineSeparator>
          <TimelineContent sx={{pb:4}}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant='h6'>
                Location Name
              </Typography>
              <Typography variant='body2'>
                short note
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent sx={{ pt: 3, px: 2 }}>
              <Typography variant='subtitle2'>
                01/02/2022
              </Typography>
              <Typography variant='caption'>
                09:30 am
              </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator sx={{ pt: 2}}>
            <TimelineDot />
            <TimelineConnector sx={{minHeight: 60}}/>
          </TimelineSeparator>
          <TimelineContent sx={{pb:4}}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant='h6'>
                Location Name
              </Typography>
              <Typography variant='body2'>
                short note
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent sx={{ pt: 3, px: 2 }}>
              <Typography variant='subtitle2'>
                01/02/2022
              </Typography>
              <Typography variant='caption'>
                09:30 am
              </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator sx={{ pt: 2}}>
            <TimelineDot />
            <TimelineConnector sx={{minHeight: 60}}/>
          </TimelineSeparator>
          <TimelineContent sx={{pb:4}}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant='h6'>
                Location Name
              </Typography>
              <Typography variant='body2'>
                short note
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        
      </Timeline>
    </React.Fragment>
  );
}
