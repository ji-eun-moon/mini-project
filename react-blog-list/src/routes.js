import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';


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