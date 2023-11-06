// component
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    // icon: icon('ic_dashboard'),
    icon: <Iconify icon={'fluent-mdl2:b-i-dashboard'} />,
  },
  {
    title: 'Tag Change Log',
    path: '/status',
    // icon: icon('ic_status'),
    icon: <Iconify icon={'pajamas:log'} />,
  },
  // {
  //   title: 'log',
  //   path: '/log',
  //   icon: icon('ic_log'),
  // },
  // {
  //   title: 'setting',
  //   path: '/setting',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_log'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
