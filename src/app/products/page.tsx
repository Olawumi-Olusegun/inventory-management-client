"use client";
import { useCreateProductMutation, useGetProductsQuery } from '@/state/api';
import React, { useState } from 'react'
import Header from '../(components)/Header';
import { PlusCircleIcon, SearchIcon } from 'lucide-react';
import Rating from '../(components)/Rating';
import CreateProductModal from './createProductModal';

interface ProductFormData {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
}

const Products = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: productData, isLoading, isError } = useGetProductsQuery(searchTerm);

    const [createProduct] = useCreateProductMutation();

    const products = productData?.products;

    const handleCreateProduct = async (productData: ProductFormData) => {
        await createProduct(productData);
    }

    if (isLoading) {
        return <div className="py-4 w-full text-center">Loading...</div>
    }

    if (isError) {
        return <div className="w-full text-center text-red-500 py-4">
            Failed to fetch products
        </div>
    }


    return (
        <div className='mx-auto pb-5 w-full'>
            <div className="mb-6">
                <div className="relative flex items-center rounded">
                    <SearchIcon className='w-5 h-5 text-gray-500 absolute left-2 top-1/2 -translate-y-1/2 ' />
                    <input
                        type="text"
                        name="searchTerm"
                        id="searchTerm"
                        placeholder='Search products...'
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className='w-full py-2 px-4 duration-75 outline outline-2 outline-gray-400  border-gray-200 rounded bg-white pl-10 focus:outline-none focus:outline-2 focus:outline-blue-500'
                    />
                </div>
            </div>
            <div className="flex justify-between items-center mb-6">
                <Header name='Products' />
                <button type='button' onClick={() => setIsModalOpen(true)} className="flex items-center bg-blue-500 hover:bg-blue-700 duration-300 text-gray-200 font-bold py-2 px-4 rounded">
                    <PlusCircleIcon className='w-5 h-5 mr-2 text-gray-200' /> Create Product
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
                {
                    isLoading
                        ? <div className=''>Loading...</div>
                        : products?.map((product) => (
                            <div key={product.productId} className="border rounded-md p-4 max-w-full w-full mx-auto">
                                <div className="flex flex-col items-center">
                                    img
                                    <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
                                    <p className="text-gray-800">${product.price.toFixed()}</p>
                                    <div className="text-sm text-gray-800 mt-1">Stock {product.stockQuantity} </div>

                                    {product.rating && <div className="flex items-center mt-2">
                                        <Rating rating={product.rating} />
                                    </div>}
                                </div>
                            </div>
                        ))
                }
            </div>

            {/* modal */}
            <CreateProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateProduct}
            />
        </div>
    )
}

export default Products