import React, { useState } from 'react'
import { v4 } from 'uuid';
import Header from '../(components)/Header';
import { PlusCircleIcon } from 'lucide-react';

interface ProductFormData {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
}

interface CreateProductModal {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: ProductFormData) => void;
}
const CreateProductModal = ({ isOpen, onClose, onCreate }: CreateProductModal) => {

    const [formData, setFormData] = useState({
        productId: v4(),
        name: "",
        price: 0,
        stockQuantity: 0,
        rating: 0
    });

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onCreate(formData);
        onClose();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: name === "price" || name === "stockQuantity" || name === "rating" ? parseFloat(value) : value
        }));
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20 p-2'>
            <div className="relative top-20 mx-auto p-5 border w-full lg:w-[45%] shadow rounded-md bg-white">
                <Header name='Create New Product' />
                <form onSubmit={handleFormSubmit} className='mt-6'>
                    <label htmlFor="name" className='block py-1.5 text-sm font-medium text-gray-700'>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className='block w-full outline p-2 outline-2 outline-gray-400 focus:outline-none focus:outline-2 focus:outline-offset-1 focus:outline-blue-500 duration-75 mb-2 rounded-md'
                    />
                    <label htmlFor="price" className='block py-1.5 text-sm font-medium text-gray-700'>Product Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className='block w-full outline p-2 outline-2 outline-gray-400 focus:outline-none focus:outline-2  focus:outline-offset-1 focus:outline-blue-500 duration-75 mb-2 rounded-md'
                    />
                    <label htmlFor="stockQuantity" className='block py-1.5 text-sm font-medium text-gray-700'>Product Stock Quantity</label>
                    <input
                        type="number"
                        name="stockQuantity"
                        id="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleChange}
                        required
                        className='block w-full outline p-2 outline-2 outline-gray-400 focus:outline-none focus:outline-2  focus:outline-offset-1 focus:outline-blue-500 duration-75 mb-2 rounded-md'
                    />
                    <label htmlFor="rating" className='block py-1.5 text-sm font-medium text-gray-700'>Product Rating</label>
                    <input
                        type="number"
                        name="rating"
                        id="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                        className='block w-full outline p-2 outline-2 outline-gray-400 focus:outline-none focus:outline-2  focus:outline-offset-1 focus:outline-blue-500 duration-75 mb-2 rounded-md'
                    />

                    <div className="flex justify-end items-center my-6 gap-3">
                        <button type='button' className="flex items-center bg-gray-500 hover:bg-stone-950 duration-300 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                        <button type='submit' className="flex items-center bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded">
                            <PlusCircleIcon className='w-5 h-5 mr-2 text-white' /> Create Product
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreateProductModal