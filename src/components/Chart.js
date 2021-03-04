import React, { Component, useState, useEffect } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'



const services = ["User Hardware Installation", "Network Hardware Installation", "User Troubleshooting", "Network Troubleshooting",
    "Software Installation", "Firewall Installation and Configuration"];

const prices = [25, 50, 100]




class Chart extends Component {
    constructor(props) {
        super(props);
        

        this.state = {
            data: {
                labels: ["User Hardware Installation", "Network Hardware Installation", "User Troubleshooting", "Network Troubleshooting",
                "Software Installation", "Firewall Installation and Configuration"],
                datasets: [{
                    label: "Services",
                    data: [25,50,50,100,100,100],
                    backgroundColor: [
                        "green",
                        "lightgreen",
                        "lightgreen",
                        "yellow",
                        "yellow",
                        "yellow"
                    ]
                }]
            },
        }
    }
    
    getChartData = canvas => {
        const data = this.state.data;
        return data;
    }


    render() {
        return (
            <div className="chart">
                <Pie
                    data={this.getChartData}
                    options={{
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: "Products Prices",
                            fontSize: 18
                        },
                        legend: {
                            display: false,
                            position: "right"
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;