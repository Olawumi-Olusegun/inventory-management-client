"use client";

import React, { useState } from 'react'
import Header from '../(components)/Header';

interface SettingsProps {
    label: string;
    value: string | boolean;
    type: "text" | "toggle",
}

const mockSettings: SettingsProps[] = [
    { label: "Username", value: "johndoe", type: "text" },
    { label: "Email", value: "johndoe@example.com", type: "text" },
    { label: "Notification", value: true, type: "toggle" },
    { label: "Dark Mode", value: false, type: "toggle" },
    { label: "Language", value: "English", type: "text" },
];

const Settings = ({ label, value, type }: SettingsProps) => {

    const [userSettings, setUserSettings] = useState(mockSettings);


    const handleToggleChange = (index: number) => {
        const settingsCopy = [...userSettings];
        settingsCopy[index].value = !settingsCopy[index].value as boolean;
        setUserSettings(settingsCopy)
    }

    return (
        <div className='w-full'>
            <Header name='User Settings' />
            <div className="overflow-x-auto shadow-md py-5">
                <table className="min-w-full bg-white rounded-lg">
                    <thead className='bg-gray-800 text-white'>
                        <tr className="">
                            <th className="text-left p-3 uppercase font-semibold text-sm">Settings</th>
                            <th className="text-left p-3 uppercase font-semibold text-sm">Value</th>
                        </tr>
                    </thead>
                    <tbody className='space-y-7'>
                        {
                            userSettings?.map((setting, index) => (
                                <tr key={setting.label} className='hover:bg-blue-50'>
                                    <td className='py-3 px-4 font-semibold'>{setting.label}</td>
                                    <td className='py-3 px-4'>
                                        {setting.type === "toggle"
                                            ? (
                                                <label className="inline-flex relative items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={setting.value as boolean}
                                                        onChange={() => handleToggleChange(index)}
                                                    />
                                                    <div
                                                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-2 
                                                  transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                                                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                                                  after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                                                  peer-checked:bg-blue-600"
                                                    ></div>
                                                </label>
                                            )
                                            : <div className="flex-1">
                                                <input type="text" className='w-full px-4 py-3 rounded-lg text-gray-500 outline outline-2 outline-gray-300 focus:outline-none focus:outline-2 focus:outline-offset-0 focus:outline-blue-500 duration-300' />
                                            </div>
                                        }
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Settings