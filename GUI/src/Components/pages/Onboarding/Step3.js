import React, { useRef } from 'react';

const Step3 = ({ nextStep, prevStep, formData, setForm,step, getProgressBarWidth }) => {
  const { description } = formData;
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...formData, [name]: value });

    // Automatically adjust the height of the textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="progress-bar">
        <div className="progress" style={{ width: getProgressBarWidth() }}></div>
      </div>
      <label htmlFor="description">Write a short description about your shelter:</label>
      <textarea
        ref={textareaRef}
        name="description"
        id="description"
        value={description}
        onChange={handleChange}
        style={{ resize: 'none', minHeight: '100px', overflowY: 'hidden' }}
        required
      />

      <div className="signup-buttons-container">
        <button onClick={prevStep}>Back</button>
        <button type="submit">Next</button>
      </div>
    </form>
    </>
  );
};

export default Step3;
