import React, { useState } from 'react';
import '../ComplaintForm.css'; // Import the new CSS file

const ComplaintForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    phone: '',
    email: '',
  });

  const [categories, setCategories] = useState({
    pothole: false,
    traffic: false,
    waterlogging: false,
    unevenRoad: false,
  });

  const [files, setFiles] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Handler for text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for category checkbox changes
  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setCategories((prevCategories) => ({
      ...prevCategories,
      [name]: checked,
    }));
  };

  // Handler for file input
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      categories,
      files: files.map((f) => f.name), // Just sending file names for demonstration
      isAnonymous,
    };
    console.log('Form Submitted:', submissionData);
    alert('Complaint submitted successfully! Check the console for the data.');
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="header">
          <h1 className="title">Submit a Complaint</h1>
          <p className="subtitle">Please provide the details of your issue below.</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            {/* Left Column */}
            <div className="column">
              <div className="form-group">
                <label htmlFor="subject" className="label">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} className="input" placeholder="e.g., Pothole on Main Street" required />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="label">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="textarea" placeholder="Please provide as much detail as possible..." required />
              </div>
              <div className="form-group">
                <label className="label">Category</label>
                <div className="category-grid">
                  {Object.keys(categories).map((cat) => (
                    <div key={cat} className="checkbox-container">
                      <input type="checkbox" id={cat} name={cat} checked={categories[cat]} onChange={handleCategoryChange} className="checkbox" />
                      <label htmlFor={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1).replace('R', ' R')}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="label">Attach Photo/Video (Optional)</label>
                <input type="file" id="fileUpload" onChange={handleFileChange} multiple hidden />
                <label htmlFor="fileUpload" className="file-upload">
                  Click to browse or drag & drop files
                  {files.length > 0 && <p style={{ fontSize: '12px', marginTop: '10px' }}>{files.length} file(s) selected.</p>}
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="column">
              <div className="form-group">
                <label className="label">Location of Incident</label>
                <div className="map-placeholder">[ Interactive Map Placeholder ]</div>
                <button type="button" className="location-button">Use Current Location</button>
              </div>
              <div className="form-group">
                <label className="label">Your Contact Information</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="input" placeholder="Phone Number" disabled={isAnonymous} />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input" placeholder="Email" disabled={isAnonymous} />
                <div className="checkbox-container" style={{ marginTop: '15px' }}>
                  <input type="checkbox" id="anonymous" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="checkbox" />
                  <label htmlFor="anonymous">Submit Anonymously</label>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">Submit Complaint</button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;