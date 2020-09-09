import React, { FormEvent } from 'react';
import './PostApplication.css';
import $ from 'jquery';


function PostApplication() {

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    alert("Form Submitted")
  }

  function showCountryList(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.currentTarget.parentElement!.nextElementSibling!.classList.add('show')
  }

  function hideCountryList(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.parentElement!.nextElementSibling!.classList.remove('show')
  }

  function onCountrySelected(inElem: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let target = event.target as HTMLElement
    console.log(target)
    if (target && !target.classList.contains("dropdown-menu")) {
      if (inElem) {
        let t = document.getElementById(inElem) as HTMLInputElement
        t.value = target.textContent!.trim()
      }
      event.currentTarget.classList.remove('show')
    }
  }


  return (
    <div className="PostApplication">
      <form className="mt-0 mt-sm-4 p-4 p-sm-5 rounded-sm" onSubmit={onSubmit}>
        <h3 className="font-weight-normal mb-5">Post Application</h3>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input autoComplete="off" type="text"
            className="form-control py-4 rounded-15 text-body w-100"
            id="name"
            placeholder="full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input autoComplete="off" type="email"
            className="form-control py-4 rounded-15 text-body w-100"
            id="email"
            placeholder="abcd@xyz.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <div className="dropdown cstm-dropdown form-control">
            <div className="dropdown-toggle">
              <input onClick={showCountryList} onBlur={hideCountryList} autoComplete="off" style={{ outline: 'none' }} type="text" id="country" className="border-0 w-100" placeholder="Country" />
            </div>
            <div className="border dropdown-menu font-18 shadow text-body" onClick={onCountrySelected.bind(this, 'country')} onMouseDown={(e) => e.preventDefault()}>
              <span className="dropdown-item item-sm">Forrest Krajcik</span>
              <span className="dropdown-item item-sm">Al Morar</span>
            </div>
          </div>
        </div>
        
        <button id="submitBtn" name="submitBtn" type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostApplication;
