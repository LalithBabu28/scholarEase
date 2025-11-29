import React, { useEffect, useState, useContext } from "react";
import { studentService } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const StudentDashboard = () => {
    const { user, userId } = useContext(AuthContext);

    const [scholarships, setScholarships] = useState([]);
    const [applications, setApplications] = useState([]);
    const [driveLink, setDriveLink] = useState("");
    const [selectedScholarship, setSelectedScholarship] = useState(null);

    useEffect(() => {
        loadScholarships();
        loadMyApplications();
    }, [userId]);

    const loadScholarships = async () => {
        const res = await studentService.getAllScholarships();
        setScholarships(res.data);
    };

    const loadMyApplications = async () => {
        if (!userId) return;
        const res = await studentService.getMyApplications(userId);
        setApplications(res.data);
    };

    const handleApply = async (e) => {
        e.preventDefault();

        if (!selectedScholarship) return alert("Select a scholarship first!");

        const applicationData = {
            studentId: userId,
            scholarId: selectedScholarship.id,
            driveLink: driveLink,
        };

        await studentService.apply(applicationData);

        alert("Application Submitted!");
        setDriveLink("");
        setSelectedScholarship(null);
        loadMyApplications();
    };

    return (
        <div className="dashboard">
            <h1>Welcome, {user}</h1>

            {/* Scholarships List */}
            <div className="split-view">
                <div className="section">
                    <h3>Available Scholarships</h3>
                    <div className="card-grid">
                        {scholarships.map((s) => (
                            <div key={s.id} className="card">
                                <h4>{s.scholarname}</h4>
                                <p>{s.description}</p>
                                <p><strong>Amount:</strong> ₹{s.amount}</p>
                                <p>
                                    <strong>Deadline:</strong>{" "}
                                    {new Date(s.deadline).toLocaleDateString()}
                                </p>
                                <button onClick={() => setSelectedScholarship(s)}>
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Applications Table */}
                <div className="section">
                    <h3>My Applications</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Scholarship</th>
                                <th>Status</th>
                                <th>Applied Date</th>
                                <th>Document</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id}>
                                    <td>{app.scholarname}</td>
                                    <td className={`status ${app.status.toLowerCase()}`}>
                                        {app.status}
                                    </td>
                                    <td>
                                        {new Date(app.appliedTime).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <a href={app.driveLink} target="_blank" rel="noreferrer">
                                            View Docs
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Apply Modal */}
            {selectedScholarship && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Apply for {selectedScholarship.scholarname}</h3>
                        <form onSubmit={handleApply}>
                            <label>Google Drive Link</label>
                            <input
                                value={driveLink}
                                onChange={(e) => setDriveLink(e.target.value)}
                                required
                                placeholder="https://drive.google.com/..."
                            />

                            <div className="modal-actions">
                                <button type="submit">Submit Application</button>
                                <button
                                    type="button"
                                    className="cancel"
                                    onClick={() => setSelectedScholarship(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
