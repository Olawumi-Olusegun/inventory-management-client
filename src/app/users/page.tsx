"use client"

import { useGetUsersQuery } from '@/state/api'
import React from 'react'
import Header from '../(components)/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: "userId", headerName: "User ID", width: 200 },
    { field: "name", headerName: "Username", width: 200 },
    { field: "email", headerName: "email", width: 300, },

]

const Users = () => {

    const { data: userData, isLoading, isError } = useGetUsersQuery();
    const users = userData?.users;

    if (isLoading) {
        return <div className="py-4 w-full text-center">Loading...</div>
    }

    if (isError) {
        return <div className="w-full text-center text-red-500 py-4">
            Failed to fetch users
        </div>
    }

    return (
        <div className='flex flex-col'>
            <Header name='Users' />
            <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row.userId}
                checkboxSelection
                className='bg-white shadow rounde-lg border border-gray-200 mt-5 !text-gray-700 '
            />
        </div>
    )
}

export default Users