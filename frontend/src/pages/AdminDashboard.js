import React, { useEffect, useState } from "react";
import { adminService } from "../services/api";

const AdminDashboard = () => {
    const [scholarships, setScholarships] = useState([]);
    const [applications, setApplications] = useState([]);

    const [newScholar, setNewScholar] = useState({
        scholarname: "",
        title: "",
        description: "",
        eligibility: "",
        requireddocuments: "",
        deadline: "",
        amount: 0,
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

        setNewScholar({
            scholarname: "",
            title: "",
            description: "",
            eligibility: "",
            requireddocuments: "",
            deadline: "",
            amount: 0,
        });

        loadAll();
    };

    const handleDeleteScholarship = async (id) => {
        await adminService.deleteScholarship(id);
        loadAll();
    };

    const handleStatusChange = async (id, status) => {
        if (status === "APPROVED") {
            await adminService.approveApplication(id);
        } else {
            await adminService.rejectApplication(id);
        }
        loadAll();
    };

    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>

            <div className="admin-grid">
                {}
                <div className="section">
                    <h3>Add New Scholarship</h3>

                    <form onSubmit={handleAddScholarship} className="admin-form">
                        <input
                            placeholder="Scholarship Name"
                            value={newScholar.scholarname}
                            onChange={(e) =>
                                setNewScholar({ ...newScholar, scholarname: e.target.value })
                            }
                            required
                        />
                        <input
                            placeholder="Title"
                            value={newScholar.title}
                            onChange={(e) =>
                                setNewScholar({ ...newScholar, title: e.target.value })
                            }
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={newScholar.description}
                            onChange={(e) =>
                                setNewScholar({
                                    ...newScholar,
                                    description: e.target.value,
                                })
                            }
                            required
                        />
                        <input
                            placeholder="Eligibility"
                            value={newScholar.eligibility}
                            onChange={(e) =>
                                setNewScholar({ ...newScholar, eligibility: e.target.value })
                            }
                            required
                        />
                        <input
                            placeholder="Required Documents"
                            value={newScholar.requireddocuments}
                            onChange={(e) =>
                                setNewScholar({
                                    ...newScholar,
                                    requireddocuments: e.target.value,
                                })
                            }
                            required
                        />
                        <input
                            type="date"
                            value={newScholar.deadline}
                            onChange={(e) =>
                                setNewScholar({ ...newScholar, deadline: e.target.value })
                            }
                            required
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={newScholar.amount}
                            onChange={(e) =>
                                setNewScholar({ ...newScholar, amount: e.target.value })
                            }
                            required
                        />

                        <button type="submit">Create Scholarship</button>
                    </form>

                    {}
                    <h3>Existing Scholarships</h3>
                    <ul>
                        {scholarships.map((s) => (
                            <li key={s.id} className="list-item">
                                <span>{s.scholarname}</span>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteScholarship(s.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {}
                <div className="section">
                    <h3>Applications</h3>

                    <table>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Scholarship</th>
                                <th>Status</th>
                                <th>Document</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id}>
                                    <td>{app.studentId}</td>
                                    <td>{app.scholarname}</td>
                                    <td className={`status ${app.status.toLowerCase()}`}>
                                        {app.status}
                                    </td>
                                    <td>
                                        <a href={app.driveLink} target="_blank" rel="noreferrer">
                                            View Docs
                                        </a>
                                    </td>
                                    <td>
                                        {app.status === "PENDING" && (
                                            <>
                                                <button
                                                    className="approve-btn"
                                                    onClick={() =>
                                                        handleStatusChange(app.id, "APPROVED")
                                                    }
                                                >
                                                    ✔
                                                </button>
                                                <button
                                                    className="reject-btn"
                                                    onClick={() =>
                                                        handleStatusChange(app.id, "REJECTED")
                                                    }
                                                >
                                                    ✖
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
