"use client"

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import { fetchCustomers } from "@/actions/fetch-customers";
import { Customer } from "@/types";
import "./tables.css";

export function ViewDescendingAllCustomer() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [page, setPage] = useState(10000); // Comenzamos desde la página 10000
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [initialLoad, setInitialLoad] = useState(false);

    const { ref, inView } = useInView();

    const loadMoreCustomers = async (nextPage: number) => {
        setLoading(true);
        const data: any = await fetchCustomers(nextPage);
        if (data && data.error === false) {
            let descending = data.data.customers.reverse();
            console.log(descending);
            // Concatenamos los nuevos clientes al principio de la lista
            setCustomers((prevCustomers: Customer[]) => [ ...prevCustomers, ...descending]);
            setTotalItems(data.data.paginationInfo.totalItems);
            setPage(nextPage);
        }
        setLoading(false);
    };
    
    
    useEffect(() => {
        if (inView && !loading && customers.length < totalItems && initialLoad) {
            loadMoreCustomers(page - 1); // Cargamos la página anterior
        }
    }, [inView, loading, customers, totalItems, initialLoad, page]);

    const handleInitialLoad = async () => {
        await loadMoreCustomers(page); // Cargamos la página actual (10000)
        setInitialLoad(true);
    };
    
    return (
        <>
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
            {!initialLoad && (
                <button 
                    onClick={handleInitialLoad} 
                    className="bg-btn text-white px-4 py-2 rounded-md"
                >
                    Descending
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

