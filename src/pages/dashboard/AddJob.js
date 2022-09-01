import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  handleChange,
  handleClear,
  createJob,
  editJob,
} from "../../features/job/jobSlice";
import { useEffect } from "react";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill Out all feilds");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleInput}
          ></FormRow>
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleInput}
          ></FormRow>
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleInput}
            labelText="Job Location"
          ></FormRow>
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleInput}
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            value={jobType}
            handleChange={handleInput}
            list={jobTypeOptions}
            labelText="Job Type"
          />

          {/* btn container */}
          <div className="btn-container">
            <button
              type="button"
              onClick={() => dispatch(handleClear())}
              className="btn btn-block clear-btn"
            >
              Clear
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
