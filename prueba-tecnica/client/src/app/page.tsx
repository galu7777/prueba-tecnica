"use client"

import { useState } from 'react';
import { ViewAllCustomers } from "@/views/ViewAllCustomers";
import { ViewSearch } from "@/views/ViewSearch";

export default function Home() {
    const [currentView, setCurrentView] = useState('all'); // Estado para mantener la vista actual

    const handleViewAllClick = () => {
        setCurrentView('all'); // Cambiar a vista de todos los clientes
    };

    const handleSearchClick = () => {
        setCurrentView('search'); // Cambiar a vista de búsqueda
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="flex items-center mb-4">
                <img src="https://netsocs.com/logo-netsocs-03.png" alt="NetSocs Logo" className="h-8 mr-2" />
                <h1 className="text-3xl font-bold">Prueba técnica Netsocs</h1>
            </div>
            <div className="w-[85%] h-85vh bg-gray-700 overflow-y-auto">
                {currentView === 'all' && <ViewAllCustomers />}
                {currentView === 'search' && <ViewSearch />}
            </div>
            <div className="flex justify-center mt-4">
                <button 
                    onClick={handleViewAllClick} 
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-4"
                >Ver Todos</button>
                <button 
                    onClick={handleSearchClick}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                >Buscar</button>
            </div>
            <footer className="mt-4 text-center text-gray-600">
                Netsocs 2024
            </footer>
        </div>
    );
}
