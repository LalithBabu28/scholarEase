import React, { useEffect, useState } from "react";
import { adminService } from "../services/api";
import Tabs from "../components/Tabs";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [scholarships, setScholarships] = useState([]);
    const [applications, setApplications] = useState([]);

    const [newScholar, setNewScholar] = useState({
        scholarname: "", title: "", description: "",
        eligibility: "", requireddocuments: "",
        deadline: "", amount: 0
    });

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        const sch = await adminService.getAllScholarships();
        const apps = await adminService.getAllApplications();
        setScholarships(sch.data);
        setApplications(apps.data);
    };

    const handleAddScholarship = async (e) => {
        e.preventDefault();
        await adminService.addScholarship(newScholar);
        alert("Scholarship Added!");
        loadAll();
    };

    const handleDeleteScholarship = async (id) => {
        await adminService.deleteScholarship(id);
        loadAll();
    };

    const handleStatusChange = async (id, status) => {
        if (status === "APPROVED") await adminService.approveApplication(id);
        else await adminService.rejectApplication(id);
        loadAll();
    };

    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>

            <Tabs
                tabs={["Add Scholarship", "Manage Scholarships", "Applications"]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* TAB 1: Add Scholarship */}
{activeTab === 0 && (
    <form onSubmit={handleAddScholarship} className="admin-form">

        <label>Scholarship Name</label>
        <input
            placeholder="Enter scholarship name"
            value={newScholar.scholarname}
            onChange={(e) => setNewScholar({ ...newScholar, scholarname: e.target.value })}
            required
        />

        <label>Title</label>
        <input
            placeholder="Enter title"
            value={newScholar.title}
            onChange={(e) => setNewScholar({ ...newScholar, title: e.target.value })}
            required
        />

        <label>Description</label>
        <textarea
            placeholder="Enter detailed scholarship description"
            value={newScholar.description}
            onChange={(e) => setNewScholar({ ...newScholar, description: e.target.value })}
            required
        />

        <label>Eligibility Criteria</label>
        <input
            placeholder="Example: GPA > 7.5 / Income < ₹2,00,000 / Only 1st year students"
            value={newScholar.eligibility}
            onChange={(e) => setNewScholar({ ...newScholar, eligibility: e.target.value })}
            required
        />

        <label>Required Documents</label>
        <input
            placeholder="Example: Aadhaar, Bonafide, Income Certificate"
            value={newScholar.requireddocuments}
            onChange={(e) => setNewScholar({ ...newScholar, requireddocuments: e.target.value })}
            required
        />

        <label>Application Deadline</label>
        <input
            type="date"
            value={newScholar.deadline}
            onChange={(e) => setNewScholar({ ...newScholar, deadline: e.target.value })}
            required
        />

        <label>Scholarship Amount (₹)</label>
        <input
            type="number"
            placeholder="Enter amount"
            value={newScholar.amount}
            onChange={(e) => setNewScholar({ ...newScholar, amount: e.target.value })}
            required
        />

        <button type="submit">Create Scholarship</button>
    </form>
)}


           {/* TAB 2: Manage Scholarships */}
{activeTab === 1 && (
  <div className="scholarship-list">
    {scholarships.map((s) => (
      <div key={s.id} className="scholarship-item">
        <div className="scholarship-info">
          <span className="title">{s.scholarname}</span>
          <br></br>
          <span className="date">Deadline: {new Date(s.deadline).toLocaleDateString()}</span>
        </div>

        <button
          className="delete-btn"
          onClick={() => handleDeleteScholarship(s.id)}
        >
          Delete
        </button>
      </div>
    ))}
  </div>
)}



            {/* TAB 3: Applications */}
            {activeTab === 2 && (
                <table>
                    <thead>
                        <tr><th>Student ID</th><th>Scholarship</th><th>Status</th><th>Document</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app.id}>
                                <td>{app.studentId}</td>
                                <td>{app.scholarname}</td>
                                <td>{app.status}</td>
                                <td><a href={app.driveLink} target="_blank">View</a></td>
                                <td>
                                    {app.status === "PENDING" && (
                                        <>
                                            <button className="approve-btn" onClick={() => handleStatusChange(app.id, "APPROVED")}>✔</button>
                                            <button className="reject-btn" onClick={() => handleStatusChange(app.id, "REJECTED")}>✖</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;
