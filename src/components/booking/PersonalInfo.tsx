import React from 'react';

interface PersonalInfoProps {
  formData: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, onChange }) => {
  return (
    <div>
      <label>Full Name:</label>
      <input
        type="text"
        name="clientName"
        value={formData.clientName}
        onChange={onChange}
        required
      />
      <label>Email Address:</label>
      <input
        type="email"
        name="clientEmail"
        value={formData.clientEmail}
        onChange={onChange}
        required
      />
      <label>Phone Number:</label>
      <input
        type="text"
        name="clientPhone"
        value={formData.clientPhone}
        onChange={onChange}
      />
    </div>
  );
};

export default PersonalInfo;
