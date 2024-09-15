"use client";

import { ExpenseByCategorySummary, useGetExpensesByCategoryQuery } from '@/state/api';
import React, { useMemo, useState } from 'react'
import Header from '../(components)/Header';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';


type AggregatedDataItem = {
    name: string;
    color?: string;
    amount: number;
};

type AggregatedData = {
    [category: string]: AggregatedDataItem;
};


const Expenses = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")


    const { data: expensesData, isLoading, isError } = useGetExpensesByCategoryQuery();

    const expenses = useMemo(() => {
        const newExpensesData = expensesData?.expenseByCategorySummary ?? [];
        return newExpensesData;

    }, [expensesData?.expenseByCategorySummary]);


    const parseDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };


    const aggregatedData: AggregatedDataItem[] = useMemo(() => {
        const filtered: AggregatedData = expenses
            .filter((data: ExpenseByCategorySummary) => {
                const matchesCategory =
                    selectedCategory === "All" || data.category === selectedCategory;
                const dataDate = parseDate(data.date);
                const matchesDate =
                    !startDate ||
                    !endDate ||
                    (dataDate >= startDate && dataDate <= endDate);
                return matchesCategory && matchesDate;
            })
            .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
                const amount = parseInt(data.amount);
                if (!acc[data.category]) {
                    acc[data.category] = { name: data.category, amount: 0 };
                    acc[data.category].color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                    acc[data.category].amount += amount;
                }
                return acc;
            }, {});

        return Object.values(filtered);
    }, [expenses, selectedCategory, startDate, endDate]);

    const classNames = {
        label: "block text-sm font-medium text-gray-700",
        selectInput: "mt-2 block w-full pl-3 pr-10 py-2 text-base border border-2 border-gray-300 focus:outline-none focus:border-transparent focus:outline-2 focus:outline-offset-0 focus:outline-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    }

    if (isLoading) {
        return <div className="py-4 w-full text-center">Loading...</div>
    }

    if (isError) {
        return <div className="w-full text-center text-red-500 py-4">
            Failed to fetch expenses
        </div>
    }


    return (
        <>
            <div className='mb-5'>
                <Header name='Expenses' />
                <p className="text-base text-gray-500 mt-2">
                    A visual representation of expenses over time.
                </p>
            </div>

            {/* FILTERS */}
            <div className="flex flex-col md:flex-row justify-between gap-4">

                <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Filter by Category and Date:</h3>
                    <div className="space-y-4">
                        <div className="">
                            <label htmlFor="category" className={classNames.label}>Category</label>
                            <select
                                id='category'
                                name='category'
                                className={classNames.selectInput}
                                defaultValue={"All"}
                                onChange={(event) => setSelectedCategory(event.target.value)}
                            >
                                <option value="">All</option>
                                <option value="">Office</option>
                                <option value="">Professional</option>
                                <option value="">Salaries</option>
                            </select>
                        </div>

                        <div className="">
                            <label htmlFor="startDate" className={classNames.label}>Start Date</label>
                            <input
                                id='startDate'
                                name='startDate'
                                className={classNames.selectInput}
                                type='text'
                                onChange={(event) => setStartDate(event.target.value)}
                            />
                        </div>

                        <div className="">
                            <label htmlFor="endDate" className={classNames.label}>End Date</label>
                            <input
                                id='endDate'
                                name='endDate'
                                className={classNames.selectInput}
                                type='text'
                                onChange={(event) => setEndDate(event.target.value)}
                            />
                        </div>


                    </div>
                </div>

                {/* CHARTS */}
                <div className="flex-grow bg-white shadow rounded-lg p-4 lg:p-6">
                    <ResponsiveContainer className={"100%"} height={400}>
                        <PieChart>
                            <Pie
                                data={aggregatedData}
                                cx={"50%"}
                                cy={"50%"}
                                label
                                outerRadius={150}
                                fill='#8884d8'
                                dataKey={"amount"}
                                onMouseDown={(_, index) => setActiveIndex(index)}
                                className='outline-none border-none'
                            >
                                {
                                    aggregatedData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index == activeIndex ? "rgb(29,78,216)" : entry.color} />
                                    ))
                                }
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>


        </>
    )
}

export default Expenses