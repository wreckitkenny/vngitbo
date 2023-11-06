import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { statistic } from '../actions/statistic';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const { stat } = useSelector(state => state.statistic);
  // const history = useHistory();

  // if (!isLoggedIn) {
  //   return <Navigate to="/" />;
  // }

  useEffect(() => {
    dispatch(statistic(user.token))
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title> VNGITBOT | Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Today" total={stat.today} icon={'gg:calendar-today'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total" total={stat.total} color="info" icon={'fluent-mdl2:total'} />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Peak of all" total={1352831} color="warning" icon={'mdi:peak'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title="Image Change Graph"
              subheader="The last two weeks"
              chartLabels={stat.graph.date}
              chartData={[
                // {
                //   name: 'Team A',
                //   type: 'column',
                //   fill: 'solid',
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
                // {
                //   name: 'Team B',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                {
                  name: 'Changes',
                  type: 'line',
                  fill: 'solid',
                  data: stat.graph.count,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
