import React, { useState } from 'react';
import { useEffect } from 'react';
const DashOtils = ({ dash_otils_trans }) => {

    const [products1, setProducts1] = useState([]);
    const [cards1, setCards1] = useState([]);
    const [orders1, setOrders1] = useState([]);
    const [max1, setmax1] = useState();
    const [min1, setmin1] = useState([]);
    const [confirmed1, setconfirmed1] = useState([]);
    const [delivred1, setdelivred1] = useState([]);
    const [total_price1, settotal_price1] = useState();
    const [general_price1, setgeneral_price1] = useState();
 
    //get all products
    const product = async () => {
        let products = await fetch('http://127.0.0.1:8000/api/products');
        let all_products = await products.json();
        setProducts1(all_products);
    }
    //get all orders
    const order = async () => {
        let orders = await fetch('http://127.0.0.1:8000/api/orders');
        let all_orders = await orders.json();
        setOrders1(all_orders);
    }
    //get all cards
    const card = async () => {
        let cards = await fetch('http://127.0.0.1:8000/api/cards');
        let all_cards = await cards.json();
        setCards1(all_cards);
    }
    //run functions 
 
     useEffect(()=>{
            product();
            order();
            card();
            let max = [0];
            for (let i = 0; i < products1.length; i++) {
                if (products1[i].price > max) {
                    max = products1[i].price;
                }
              }
              setmax1(max)
            //search min 
            let min = [1000000];
            for (let i = 0; i < products1.length; i++) {
                if (products1[i].price < min) {
                    min = products1[i].price;
                }
            }
            setmin1(min)
            //get all comfirmed orders
            let confirmed = orders1.filter(element => {
                return element.confirmed == 'Yes';
            });
            setconfirmed1(confirmed)
            //get all delivred orders
            let delivred = orders1.filter(element => {
                return element.delivred == 'Yes';
            });
            setdelivred1(delivred)
            //get total price of products taht added as orders
            let total_price=0;
            for (let i = 0; i < orders1.length; i++) {
                total_price+=orders1[i].price;
            }
            settotal_price1(total_price)
              //get total price of products taht added as orders
            let general_price=0;
            for (let i = 0; i < products1.length; i++) {
                general_price+=products1[i].price;
            }
            setgeneral_price1(general_price);
            let dash_otils = [
                {
                    id: 0,
                    key: 'products',
                    value: products1.length,
                },
                {
                    id: 1,
                    key: 'height',
                    value: max1,
                },
                {
                    id: 2,
                    key: 'low',
                    value: min1,
                },
                {
                    id: 3,
                    key: 'orders',
                    value: orders1.length
                },
                {
                    id: 4,
                    key: 'carts',
                    value: cards1.length,
                },
                {
                    id: 5,
                    key: 'confirmed',
                    value: confirmed1.length,
                },
                {
                    id: 6,
                    key: 'delivred',
                    value: delivred1.length
                },
                {
                    id: 7,
                    key: 'total',
                    value:total_price1
                },
                {
                    id: 8,
                    key: 'general',
                    value: general_price1
                }
        
            ];
            dash_otils_trans(dash_otils);
        },[products1])
            //array will sended to dashboard
           
}
export default DashOtils;
