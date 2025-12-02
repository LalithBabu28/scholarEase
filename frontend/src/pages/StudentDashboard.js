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

    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        mobileNo: "",
        aadharno: "",
        panno: "",
        password: ""
    });

    useEffect(() => {
        loadScholarships();
        loadApplications();
        loadProfile();
    }, [userId]);

    const loadScholarships = async () => {
        const res = await studentService.getAllScholarships();
        setScholarships(res.data);
    };

    const loadApplications = async () => {
        const res = await studentService.getMyApplications(userId);
        setApplications(res.data);
    };

   const loadProfile = async () => {
    const res = await studentService.getProfile(userId);
    
    setProfile({
        ...res.data,
        password: "" 
    });
};


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
        loadApplications();
    };

    const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const payload = { ...profile };
    if (!payload.password || payload.password.trim() === "") {
        delete payload.password;
    }

    await studentService.updateProfile(userId, payload);
    alert("Profile Updated Successfully");
    setProfile({ ...profile, password: "" });
    setIsEditing(false);
};


    return (
        <div className="dashboard">
            <h1>
                Welcome {user?.split("@")[0]?.charAt(0).toUpperCase() + user?.split("@")[0]?.slice(1)} 
            </h1>

            <Tabs
                tabs={["Available Scholarships", "My Applications", "My Profile"]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

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
                            <p><strong>Deadline:</strong> {new Date(s.deadline).toLocaleDateString()}</p>

                            <button onClick={() => setSelectedScholarship(s)}>Apply</button>
                        </div>
                    ))}
                </div>
            )}

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
                        {applications.map((app) => (
                            <tr key={app.id}>
                                <td>{app.scholarname}</td>
                                <td className={`status ${app.status.toLowerCase()}`}>
                                    {app.status}
                                </td>
                                <td>{new Date(app.appliedTime).toLocaleDateString()}</td>
                                <td><a href={app.driveLink} target="_blank" rel="noreferrer">View</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

           {activeTab === 2 && (
    <div className="profile-section">
        <h2>My Profile</h2>

        {!isEditing ? (
            <div className="profile-card">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Mobile:</strong> {profile.mobileNo}</p>
                <p><strong>Aadhar No:</strong> {profile.aadharno}</p>
                <p><strong>PAN No:</strong> {profile.panno}</p>

                <button onClick={() => setIsEditing(true)}>
                    Edit Profile
                </button>
            </div>
        ) : (
            <form onSubmit={handleProfileUpdate} className="profile-form">

    <label>Full Name</label>
    <input
        type="text"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        required
    />

    <label>Email (cannot be changed)</label>
    <input type="email" value={profile.email} disabled style={{ background: "#f4f4f4" }} />

    <label>Mobile Number</label>
    <input
        type="text"
        value={profile.mobileNo}
        onChange={(e) => setProfile({ ...profile, mobileNo: e.target.value })}
        required
    />

    <label>Aadhar Number (locked after registration)</label>
    <input
        type="text"
        value={profile.aadharno}
        disabled
        style={{ background: "#f4f4f4" }}
    />

    <label>PAN Number (locked after registration)</label>
    <input
        type="text"
        value={profile.panno}
        disabled
        style={{ background: "#f4f4f4" }}
    />

    <label>New Password</label>
    <input
    type="password"
    placeholder="Enter new password"
    value={profile.password}
    onChange={(e) => setProfile({ ...profile, password: e.target.value })}
    required
/>


  <div className="profile-actions">
    <button type="submit" className="btn-save">Save Changes</button>
    <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>
        Cancel
    </button>

    </div>
</form>
        )}
    </div>
)}
            {selectedScholarship && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Apply: {selectedScholarship.scholarname}</h3>

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
