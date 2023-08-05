import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import AdminPage from './pages/AdminPage';


const routes = [
  {
    path:'/',
    element: <HomePage />
  },
  {
    path:'/blogs',
    element: <ListPage />
  },
  {
    path:'/admin',
    element: <AdminPage />
  },
  {
    path:'/blogs/create',
    element: <CreatePage />
  },
  {
    path:'/blogs/:id/edit',
    element: <EditPage />
  },
  {
    path:'/blogs/:id',
    element: <DetailPage />
  },
]

export default routes;