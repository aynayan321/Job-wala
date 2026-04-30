import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate, Navigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "https://job-wala-oj9k.onrender.com/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error fetching jobs");
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    return <Navigate to="/login" />;
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Update Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const res = await axios.put(
        `https://job-wala-oj9k.onrender.com/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  // Delete Job
  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(
        `https://job-wala-oj9k.onrender.com/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setMyJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobId)
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="myJobs page">
      <div className="container">
        <h1>Your Posted Jobs</h1>

        {myJobs.length > 0 ? (
          <div className="banner">
            {myJobs.map((element) => (
              <div className="card" key={element._id}>
                <div className="content">
                  <div className="short_fields">

                    <div>
                      <span>Title:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(element._id, "title", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <span>Country:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.country}
                        onChange={(e) =>
                          handleInputChange(element._id, "country", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <span>City:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.city}
                        onChange={(e) =>
                          handleInputChange(element._id, "city", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <span>Category:</span>
                      <select
                        value={element.category}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(element._id, "category", e.target.value)
                        }
                      >
                        <option>Frontend Web Development</option>
                        <option>MERN Stack Development</option>
                        <option>Artificial Intelligence</option>
                        <option>Data Entry Operator</option>
                      </select>
                    </div>

                    <div>
                      <span>Salary:</span>
                      {element.fixedSalary ? (
                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.fixedSalary}
                          onChange={(e) =>
                            handleInputChange(element._id, "fixedSalary", e.target.value)
                          }
                        />
                      ) : (
                        <>
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryFrom}
                            onChange={(e) =>
                              handleInputChange(element._id, "salaryFrom", e.target.value)
                            }
                          />
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryTo}
                            onChange={(e) =>
                              handleInputChange(element._id, "salaryTo", e.target.value)
                            }
                          />
                        </>
                      )}
                    </div>

                  </div>

                  <div className="long_field">
                    <textarea
                      value={element.description}
                      disabled={editingMode !== element._id}
                      onChange={(e) =>
                        handleInputChange(element._id, "description", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="button_wrapper">
                  {editingMode === element._id ? (
                    <>
                      <button onClick={() => handleUpdateJob(element._id)}>
                        <FaCheck />
                      </button>
                      <button onClick={handleDisableEdit}>
                        <RxCross2 />
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleEnableEdit(element._id)}>
                      Edit
                    </button>
                  )}

                  <button onClick={() => handleDeleteJob(element._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
