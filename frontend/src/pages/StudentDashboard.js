import React, { useEffect, useState, useContext } from "react";
import { studentService } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Tabs from "../components/Tabs";

const StudentDashboard = () => {
    const { userId, user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState(0);
    const [scholarships, setScholarships] = useState([]);
    const [applications, setApplications] = useState([]);
    
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [driveLink, setDriveLink] = useState("");

    useEffect(() => {
        studentService.getAllScholarships().then(res => setScholarships(res.data));
        studentService.getMyApplications(userId).then(res => setApplications(res.data));
    }, [userId]);

    const handleApply = async (e) => {
        e.preventDefault();
        if (!selectedScholarship) return;

        await studentService.apply({
            studentId: userId,
            scholarId: selectedScholarship.id,
            driveLink
        });

        alert("Application Submitted!");
        setDriveLink("");
        setSelectedScholarship(null);

        studentService.getMyApplications(userId).then(res => setApplications(res.data));
    };

    return (
        <div className="dashboard">
            <h1>Welcome {user?.split("@")[0].charAt(0).toUpperCase() + user?.split("@")[0].slice(1)}</h1>


            <Tabs
                tabs={["Available Scholarships", "My Applications"]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* TAB: Available Scholarships */}
            {activeTab === 0 && (
                <div className="card-grid">
                    {scholarships.map((s) => (
                        <div key={s.id} className="card">
                            <h3>{s.scholarname}</h3>

                            <p style={{ fontSize: "15px", marginBottom: "10px" }}>
                                {s.description}
                            </p>

                            <p><strong>Amount:</strong> ₹{s.amount}</p>
                            <p><strong>Eligibility:</strong> {s.eligibility}</p>
                            <p><strong>Required Docs:</strong> {s.requireddocuments}</p>
                            <p>
                                <strong>Deadline:</strong>{" "}
                                {new Date(s.deadline).toLocaleDateString()}
                            </p>

                            <button onClick={() => setSelectedScholarship(s)}>Apply</button>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB: My Applications */}
            {activeTab === 1 && (
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
                        {applications.map(app => (
                            <tr key={app.id}>
                                <td>{app.scholarname}</td>
                                <td className={`status ${app.status.toLowerCase()}`}>
                                    {app.status}
                                </td>
                                <td>{new Date(app.appliedTime).toLocaleDateString()}</td>
                                <td><a href={app.driveLink} target="_blank">View</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* APPLY POPUP */}
            {selectedScholarship && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Apply to: {selectedScholarship.scholarname}</h3>

                        <form onSubmit={handleApply}>
                            <label>Google Drive Document Link</label>
                            <input
                                type="text"
                                placeholder="https://drive.google.com/..."
                                value={driveLink}
                                onChange={(e) => setDriveLink(e.target.value)}
                                required
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
