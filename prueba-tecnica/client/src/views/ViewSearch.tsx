"use client"

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import { fetchSearchCustomers } from "@/actions/fetch-customers";
import { Customer } from "@/types";
import "./tables.css"

export function ViewSearch() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const { ref, inView } = useInView();

    const searchCustomers = async () => {
        setLoading(true);
        try {
        const data: any = await fetchSearchCustomers(searchTerm, page);
        if (data && data.error === false) {
            const newCustomers = data.data.filteredCustomers;
            setCustomers((prevCustomers) => [...prevCustomers, ...newCustomers]);
            setTotalCustomers(data.data.pagination.totalCustomers);
            setPage((prevPage) => prevPage + 1);
        }
        } catch (error) {
        console.error("Error fetching search data:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (searchTerm) {
        setCustomers([]);
        setPage(1);
        searchCustomers();
        }
    }, [searchTerm]);

    useEffect(() => {
        if (inView && !loading && customers.length < totalCustomers) {
        searchCustomers();
        }
    }, [inView, loading, customers, totalCustomers]);
    

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
        <div className="flex justify-center items-center mt-4">
            <input 
            type="text" 
            value={searchTerm} 
            onChange={handleSearchChange} 
            className="w-[65%] px-4 py-2 border border-gray-300 rounded-md mb-4 text-black"
            style={{color: 'black'}}
            placeholder="Search customers..." 
            />
        </div>

        <table className="w-full border-collapse">
            <thead>
            <tr>
                <th className="ctn-tables border border-gray-300 px-2 py-2">id</th>
                <th className="ctn-tables border border-gray-300 px-2 py-2">First Name</th>
                <th className="ctn-tables border border-gray-300 px-2 py-2">Last Name</th>
                <th className="ctn-tables border border-gray-300 px-2 py-2">Company</th>
                <th className="ctn-tables border border-gray-300 px-2 py-2">City</th>
                <th className="ctn-tables border border-gray-300 px-2 py-2">Country</th>
                <th className="ctn-tables border border-gray-300 px-2 py-2">Email</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => (
                <tr key={customer.id} className="border border-gray-300">
                <td className="ctn-tables border border-gray-300 px-2 py-2">{customer.id}</td>
                <td className="ctn-tables border border-gray-300 px-2 py-2">{customer.firstName}</td>
                <td className="ctn-tables border border-gray-300 px-2 py-2">{customer.lastName}</td>
                <td className="ctn-tables border border-gray-300 px-2 py-2">{customer.company}</td>
                <td className="ctn-tables border border-gray-300 px-2 py-2">{customer.city}</td>
                <td className="ctn-tables border border-gray-300 px-2 py-2">{customer.country}</td>
                <td className="ctn-tables border border-gray-300 px-2 py-2">{customer.email}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
            {loading && <Spinner />}
        </div>
        <div ref={ref} />
        </>
    );
}