"use client"

import { useGetProductsQuery } from '@/state/api'
import React from 'react'
import Header from '../(components)/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: "productId", headerName: "ID", width: 200 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "price", headerName: "Price", width: 110, type: "number", valueGetter: (value, row) => `$${row.price}` },
    { field: "rating", headerName: "Rating", width: 110, type: "number", valueGetter: (value, row) => `${row.rating ? row.rating : "N/A"}` },
    { field: "stockQuantity", headerName: "StockQuanity", width: 150, type: "number", }
]

const Inventory = () => {

    const { data: productData, isLoading, isError } = useGetProductsQuery();
    const products = productData?.products;

    if (isLoading) {
        return <div className="py-4 w-full text-center">Loading...</div>
    }

    if (isError) {
        return <div className="w-full text-center text-red-500 py-4">
            Failed to fetch products
        </div>
    }

    return (
        <div className='flex flex-col'>
            <Header name='Inventory' />
            <DataGrid
                rows={products}
                columns={columns}
                getRowId={(row) => row.productId}
                checkboxSelection
                className='bg-white shadow rounde-lg border border-gray-200 mt-5 !text-gray-700 '
            />
        </div>
    )
}

export default Inventory