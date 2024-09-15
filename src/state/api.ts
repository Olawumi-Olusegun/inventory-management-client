import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export interface Product {
    id: string;
    productId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}

export interface NewProduct {
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}

export interface SalesSummary {
    id: string;
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
}

export interface PurchaseSummary {
    id: string;
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
}

export interface ExpenseSummary {
    id: string;
    expenseSummaryId: string;
    totalExpenses: number;
    date: string;
}

export interface ExpenseByCategorySummary {
    id: string;
    expenseByCategoryId: string;
    expenseSummaryId: string;
    category: string;
    amount: string;
    date: string;
}


export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[]
}

interface User {
    userId: string;
    name: string;
    email: string;
}


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
    endpoints: (build) => ({
        getDashboardMetrics: build.query<DashboardMetrics, void>({
            query: () => "/dashboard",
            providesTags: ["DashboardMetrics"]
        }),
        getProducts: build.query<{products: Product[]}, string | void>({
            query: (search) => ({
                url: "/products",
                params: search ? {search} : {}
            }),
            providesTags: ["Products"]
        }),
        createProduct: build.mutation<Product, NewProduct>({
            query: (newProduct) => ({
                url: "/products",
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ["Products"]
        }),
        getUsers: build.query<{users: User[]}, void>({
            query: () => "/users",
            providesTags: ["Users"]
        }),
        getExpensesByCategory: build.query<{expenseByCategorySummary: ExpenseByCategorySummary[]}, void>({
            query: () => "/expenses",
            providesTags: ["Expenses"]
        })
    })
});

export const {
    useGetDashboardMetricsQuery,
    useGetProductsQuery,
    useCreateProductMutation,
    useGetUsersQuery,
    useGetExpensesByCategoryQuery,
} = api;