"use client"

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import { fetchCustomers } from "@/actions/fetch-customers"; // Importamos fetchSearchCustomers
import { Customer } from "@/types";

export function ViewAllCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [initialLoad, setInitialLoad] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda

    const { ref, inView } = useInView();

    const loadMoreCustomers = async () => {
        setLoading(true);
        const nextPage = page + 1;
        const data: any = await fetchCustomers(nextPage);
        if (data && data.error === false) {
        setCustomers((prevCustomers: Customer[]) => [...prevCustomers, ...data.data.customers]);
        setTotalItems(data.data.paginationInfo.totalItems);
        setPage(nextPage);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (inView && !loading && customers.length < totalItems && initialLoad) {
        loadMoreCustomers();
        }
    }, [inView, loading, customers, totalItems, initialLoad]);

    const handleInitialLoad = async () => {
        await loadMoreCustomers();
        setInitialLoad(true);
    };

    return (
        <>
        <table className="w-full border-collapse">
            <thead>
            <tr>
                <th className="border border-gray-300 px-2 py-2">id</th>
                <th className="border border-gray-300 px-2 py-2">First Name</th>
                <th className="border border-gray-300 px-2 py-2">Last Name</th>
                <th className="border border-gray-300 px-2 py-2">Company</th>
                <th className="border border-gray-300 px-2 py-2">City</th>
                <th className="border border-gray-300 px-2 py-2">Country</th>
                <th className="border border-gray-300 px-2 py-2">Email</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => (
                <tr key={customer.id} className="border border-gray-300">
                <td className="border border-gray-300 px-2 py-2">{customer.id}</td>
                <td className="border border-gray-300 px-2 py-2">{customer.firstName}</td>
                <td className="border border-gray-300 px-2 py-2">{customer.lastName}</td>
                <td className="border border-gray-300 px-2 py-2">{customer.company}</td>
                <td className="border border-gray-300 px-2 py-2">{customer.city}</td>
                <td className="border border-gray-300 px-2 py-2">{customer.country}</td>
                <td className="border border-gray-300 px-2 py-2">{customer.email}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
            {!initialLoad && (
            <button 
                onClick={handleInitialLoad} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Load Data
            </button>
            )}
        </div>
        <div className="flex justify-center items-center mt-4">
            {loading && <Spinner />}
        </div>
        <div ref={ref} />
        </>
    );
}
