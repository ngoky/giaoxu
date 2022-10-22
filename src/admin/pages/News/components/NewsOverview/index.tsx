import { Navigate, Outlet, useLocation } from 'react-router'
import { newsConstant } from '@/constants'
import './index.scss'
import React from 'react'
// import EnhancedTable from "./components/NewsTable";
export const NewsOverview = () => {
    const location = useLocation()
    return (
        <div className="NewsOverview">
            {/* Admin- news <EnhancedTable /> */}
            <Outlet />
            {location.pathname === newsConstant.ADMIN_URL && (
                <Navigate to="list" />
            )}
        </div>
    )
}
