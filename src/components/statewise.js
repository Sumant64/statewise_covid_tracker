import React, { useEffect, useState } from 'react';
import './styles.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';



const Statewise = () => {

    const [data, setData] = useState([]);

    const getCovidData = async () => {
        const res = await fetch('https://data.covid19india.org/data.json');
        const actualData = await res.json();
        //  console.log(actualData.statewise);
        setData(actualData.statewise);
    }

    useEffect(() => {
        getCovidData();
    }, [])

    return (
        <>
            <div className="container-fluid pb-2 bg-success">
                <div className="main-heading">
                    <h1 className="mb-5 text-center">
                        <span className="font-weight-bold">INDIA</span> COVID-19 Dashboard
                    </h1>
                </div>
            </div>
            <div className="table-responsive">
                <ReactHTMLTableToExcel
                    className="btn btn-info mb-3"
                    table="emp"
                    filename="Covid Report"
                    sheet="Sheet"
                    buttonText="Export excel" />

                <table className="table table-hover" id='emp'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>State</th>
                            <th>Confirmed</th>
                            <th>Recovered</th>
                            <th>Death</th>
                            <th>Active</th>
                            <th>Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((curElem, id) => {
                                return (
                                    <>
                                        <tr key={id}>
                                            <td>{curElem.state}</td>
                                            <td>{curElem.confirmed}</td>
                                            <td>{curElem.recovered}</td>
                                            <td>{curElem.deaths}</td>
                                            <td>{curElem.active}</td>
                                            <td>{curElem.lastupdatedtime}</td>
                                        </tr>
                                    </>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Statewise