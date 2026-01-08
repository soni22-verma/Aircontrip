import React from "react";

const PassengerForm = ({
  passengerData = {},
  handleInputChange = () => {},
  handleSubmit = () => {},
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <Input
          label="Full Name"
          name="fullName"
          value={passengerData.fullName || ""}
          onChange={handleInputChange}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={passengerData.email || ""}
          onChange={handleInputChange}
        />

        <Select
          label="Gender"
          name="gender"
          value={passengerData.gender || ""}
          onChange={handleInputChange}
          options={["male", "female", "other"]}
        />

      </div>

      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default PassengerForm;

/* ===========================
   ⬇️ HELPER COMPONENTS
   SAME FILE, SAME SCOPE
=========================== */

const Input = ({ label, ...props }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      {...props}
      className="w-full border p-2 rounded"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <select
      {...props}
      className="w-full border p-2 rounded"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
