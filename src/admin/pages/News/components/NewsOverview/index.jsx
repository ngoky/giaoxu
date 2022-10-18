import { Navigate, Outlet, useLocation } from 'react-router'
import { newsConstant } from '@/constants'
// import EnhancedTable from "./components/NewsTable";
export const NewsOverview = () => {
    const location = useLocation()
    return (
        <div>
            {/* Admin- news <EnhancedTable /> */}
            <Outlet />
            {location.pathname === newsConstant.ADMIN_URL && (
                <Navigate to="list" />
            )}
        </div>
    )
}
