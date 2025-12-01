import React from "react";
import "./Tabs.css";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className="tabs">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`tab-btn ${activeTab === index ? "active" : ""}`}
                    onClick={() => setActiveTab(index)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
