import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [dropdownValue, setDropdownValue] = useState([]);
  const [options] = useState([
    'Alphabets',
    'Numbers',
    'Highest lowercase alphabet',
    'Status',
    'User ID',
    'College Email ID',
    'College Roll Number'
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
      setError('Invalid JSON input');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const dataToRender = {
      Status: response.is_success ? 'Success' : 'Failure',
      'User ID': response.user_id || '',
      'College Email ID': response.college_email || '',
      'College Roll Number': response.college_roll_number || '',
      Alphabets: response.alphabets || [],
      Numbers: response.numbers || [],
      'Highest lowercase alphabet': response.highestAlphabet || ''
    };

    return (
      <div>
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
      <h1>Roll Number: 123456</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Enter JSON (e.g., { "data": ["A", "C", "z"] })'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select multiple={true} value={dropdownValue} onChange={handleDropdownChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {renderResponse()}
    </div>
  );
}

export default App;
