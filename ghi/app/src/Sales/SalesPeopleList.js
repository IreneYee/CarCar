import { useEffect, useState } from 'react';

function SalesPeopleList() {
    const [salespeople, setSalespeople] = useState([]);

    const getData = async () => {
    const response = await fetch('http://localhost:8090/api/salespeople/');

    if (response.ok) {
        const data = await response.json();
        setSalespeople(data.salesperson);
        console.log(data.salesperson)
    }
    }


    useEffect(()=>{
        getData()
    }, [])
    return (
        <div>
            <h1>Salespeople</h1>
            <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Employee ID</th>
            </tr>
            </thead>
            <tbody>
            {salespeople.map((salesperson) => {
                return (
                <tr key={salesperson.id}>
                    <td>{ salesperson.first_name } { salesperson.last_name }</td>
                    <td>{ salesperson.employee_id }</td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>
        )
}

export default SalesPeopleList;
