import React, { useState, useEffect } from 'react';
import './AllApplications.css';
import { globalConfig, Application, getDateTime } from '../global';



function AllApplications() {



  let [applications, setApplications] = useState<Application[]>([]);


  function deleteApplication(app: Application) {
    if (window.confirm('Are you sure?')) {

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(app)
      };

      fetch(`${globalConfig.restAPI}/application/delete`, requestOptions)
        .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            alert((data && data.message) || response.status)
          } else {
            let newApps: Application[] = applications.filter((a) => a !== app)
            setApplications(newApps)
          }
        })
        .catch(error => {
          console.error('There was a network error!', error);
        });

    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
  }


  useEffect(() => {
    const requestOptions = {
      method: 'GET'
    };

    fetch(`${globalConfig.restAPI}/application/all`, requestOptions)
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          // alert((data && data.message) || response.status)
        } else {
          let apps: Application[] = data.apps
          setApplications(apps)
        }
      })
      .catch(error => {
        console.error('There was a network error!', error);
      });
  }, [])

  function renderApplications() {
    let t = applications.map((app, i) => {
      return (
        <div key={app.email} className="bg-white p-4 mb-3">
          <div className="d-flex justify-content-end">
            <span className="font-weight-medium small text-muted">{getDateTime(app.date)}</span>
          </div>

          <span className="font-weight-medium small text-muted">Application for:</span>
          <h5 className="mb-4 font-weight-normal ">{app.email}</h5>

          <div className="mb-1"><span className="font-weight-medium">Name: </span>{app.name}</div>
          <div className="mb-1"><span className="font-weight-medium">Country: </span>{app.country}</div>
          <div className="align-items-center d-flex mt-2">
            <div>
              <a target="_blank" rel="noopener noreferrer" href={`${globalConfig.resume.resumeRequestUrl}/${app.resume}`}>Resume</a>
            </div>
            <div className="ml-auto">
              <button className="btn btn-link text-danger" onClick={deleteApplication.bind(null, app)}>Delete Application</button>
            </div>
          </div>
        </div>
      )
    })

    return t.length ? t : (
      <span>No applications.</span>
    )
  }

  return (
    <div className="AllApplications">
      <div className="mt-4 p-4 page pt-5 px-sm-5 rounded-sm">
        <h3 className="font-weight-normal mb-5 text-center">All Applications</h3>
        <div>
          {
            renderApplications()
          }
        </div>
      </div>
    </div>
  );
}

export default AllApplications;
