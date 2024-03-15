import { Customer } from '@/types';

export async function fetchCustomers(page: number): Promise<Customer[] | null> {
    const apiUrl = `http://localhost:3001/v1/customers/get_all_customer?page=${page}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        return data as Customer[];
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Propagate the error for better error handling upstream
    }
}

export async function fetchSearchCustomers(searchTerm: string, page: number): Promise<Customer[] | null> {
    const apiUrl = `http://localhost:3001/v1/customers/search_customer?searchTerm=${searchTerm}&page=${page}&limit=10`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(data)
        return data as Customer[];
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Propagate the error for better error handling upstream
    }
}
