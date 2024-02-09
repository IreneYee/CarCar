import React, { useEffect, useState } from 'react';

function AutosForm() {
    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }
    const [year, setYear] = useState('');
    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }
    const [vin, setVin] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const [model_id, setModel] = useState('');
    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }
    const [models, setModels] = useState([]);
    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');

        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    }
    const handleSubmit = async (event) => {
        const data ={
            color,
            year,
            vin,
            model_id,
        };
        const autoUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(autoUrl, fetchConfig);
        if (response.ok) {
            const newAuto = await response.json();
            console.log(newAuto);
            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add an automobile to inventory</h1>
              <form onSubmit={handleSubmit} id="create-auto-form">
                <div className="form-floating mb-3">
                  <input onChange={handleColorChange} placeholder="Color" required type="text" name="color" value={color} id="color" className="form-control"/>
                  <label htmlFor="color">Color...</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleYearChange} placeholder="year" required type="number" name="year" value={year} id="year" className="form-control"/>
                  <label htmlFor="year">Year...</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleVinChange} placeholder="vin" required type="text" name="vin" value={vin} id="vin" className="form-control"/>
                  <label htmlFor="vin">VIN...</label>
                </div>
                <div className="mb-3">
                  <select onChange={handleModelChange} required name="model_id" value={model_id} id="model_id" className="form-select">
                    <option value="">Choose a model...</option>
                    {models.map(models => {
                      return ([
                          <option key={models.id} value={models.id}>{models.name}</option>,
                      ]);
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    export default AutosForm;

