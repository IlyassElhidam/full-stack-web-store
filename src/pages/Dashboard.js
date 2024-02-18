import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DashOtils from '../Dash_otils';
import { useEffect } from 'react';
import DashboardItem from '../components/dashboard_item';
const Dashboard = () => {
    const [dash_outils1, setDash_outils1] = useState([]);
    // useEffect(() => {
    //     console.log(dash_outils1);
    // }, [dash_outils1]);
    const dashboard_statistics=(dash_outils)=>{
        setDash_outils1(dash_outils)
    }
    return (
        <>
            <Navbar />
             <DashOtils dash_otils_trans={dashboard_statistics} />  
            <div className="bg-slate-100 min-h-screen">
                <div className="container mx-auto pt-32 px-16">
                    <div className="grid grid-cols-3 gap-6">
                        {
                            dash_outils1.map(element => {
                                return (
                                   <DashboardItem
                                      key={element.id}
                                      key1={element.key}
                                      value={element.value}
                                   />
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )
};

export default Dashboard;
