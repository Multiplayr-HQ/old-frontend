import React, { useEffect, useState } from 'react';
import { Card } from "react-bootstrap";
import API from '@utils/blockapi';
import { Line } from 'react-chartjs-2';
import { DateTime } from 'luxon';

function CoinGraph() {
    const [xAxis, setxAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [totalCoins, setTotalCoins] = useState([]);

    useEffect(() => {
        API.getValueData()
            .then((result) => {
                console.log(result);
                let label = [];
                let dataTemp = [];
                for (var i = 0; i < result.data.length; i++) {
                    // looping through results and getting 'date' value and pushing it into 'label' array
                    label.push(DateTime.fromMillis(result.data[i].date).toLocaleString({ month: 'short', day: 'numeric' }))
                    // looping through results and getting 'usd_value' and pushing it into 'dataTemp' array
                    dataTemp.push(result.data[i].usd_value)
                }
                setxAxis(label);
                setYAxis(dataTemp);
                setTotalCoins(result.data[result.data.length - 1]?.total_coins)
            });
    }, []);

    const data = {
        labels: xAxis,
        datasets: [
            {
                label: 'INR (Rs)',
                data: yAxis,
                fill: true,
                backgroundColor: 'rgba(60, 110, 113, 1)',
                pointBackgroundColor: 'rgb(53, 53, 53)',
                borderColor: 'rgba(52, 94, 97, 1)',
                yAxisID: 'y'
            },
        ],
    };

    const options = {
        scales: {
            y: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }

    return (
        <>
            <Card className="px-3 chart" style={{
                color: 'rgb(53, 53, 53)',
                paddingBottom: '20px',
                marginTop: '10px'
            }}>
                <div className='header'>
                    <h3>Total coins in circulation: {totalCoins}</h3>
                </div>

                <h6 className='title' style={{ 
                    textAlign: 'center',
                    paddingTop: '10px',
                    fontSize: '20px'
                }}>History of MP Coin</h6>
                <Line data={data} options={options} />
            </Card>
        </>
    )
}

export default CoinGraph;