// import Admin from "../../admin";
import { NewsOverview, EditNews, Overview, Types, NewsList } from '@/admin'
const AdminRouter = (auth) => {
    if (!auth) return []
    return [
        {
            path: 'admin',
            exact: true,
            component: Overview,
            routers: [
                {
                    path: 'news',
                    component: NewsOverview,
                    routers: [
                        { path: 'list', component: NewsList },
                        { path: 'add', component: EditNews },
                        { path: ':id', component: EditNews },
                        { path: 'update', component: EditNews }
                    ]
                },
                { path: 'types', component: Types }
            ]
        }
    ]
}
export default AdminRouter
