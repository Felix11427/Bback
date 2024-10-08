import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [dropdownValue, setDropdownValue] = useState([]);
  const [options] = useState([
    'Status',
    'User ID',
    'College Email ID',
    'College Roll Number',
    'Numbers',
    'Alphabets',
    'Highest lowercase alphabet'
  ]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setDropdownValue(Array.from(e.target.selectedOptions, option => option.value));
  };

  const handleSubmit = async () => {
    setError('');
    setResponse(null);

    try {
      // Validate JSON
      const jsonData = JSON.parse(inputValue);

      // Make API call
      const result = await axios.post('https://your-backend-api-url/bfhl', jsonData);

      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON input or API call failed');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const dataToRender = {
      Status: response.is_success ? 'Success' : 'Failure',
      'User ID': response.user_id || '',
      'College Email ID': response.college_email || '',
      'College Roll Number': response.college_roll_number || '',
      Numbers: response.numbers || [],
      Alphabets: response.alphabets || [],
      'Highest lowercase alphabet': response.highestAlphabet || ''
    };

    return (
      <div className="response-container">
        <h3>Response:</h3>
        <ul>
          {dropdownValue.map(option => (
            <li key={option}>
              <strong>{option}:</strong> {JSON.stringify(dataToRender[option])}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <div className="form-container log-in-container">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <h1>Submit JSON</h1>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder='Enter JSON (e.g., { "data": ["A", "C", "z"] })'
            />
            <button type="submit">Submit</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>JSON Response</h1>
              <p>Display API response based on selected options.</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <select multiple={true} value={dropdownValue} onChange={handleDropdownChange}>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {renderResponse()}
      </div>
    </div>
  );
}

export default App;
