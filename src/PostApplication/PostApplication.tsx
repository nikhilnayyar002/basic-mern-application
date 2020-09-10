import React, { FormEvent, useState, useEffect } from 'react';
import './PostApplication.css';
import { isValidFile, globalConfig } from '../global';
import { Subject, Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";



let countryList: Array<string> = []


function PostApplication() {

  let [fileName, setFileName] = useState('')
  let [submitFormState, setSubmitFormState] = useState(false)
  let [countries, setCountries] = useState<string[]>([])

  let fileRef: HTMLInputElement | null;
  let nameRef: HTMLInputElement | null;
  let countryRef: HTMLInputElement | null;
  let emailRef: HTMLInputElement | null;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitFormState(true);

    let currentTarget = e.currentTarget as HTMLFormElement


    let formData = new FormData();
    formData.append("name", nameRef!.value);
    formData.append("email", emailRef!.value);
    formData.append("date", (new Date()).toJSON());
    formData.append("country", countryRef!.value);
    formData.append("resumeFile", fileRef!.files![0]);

    const requestOptions = {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: formData
    };

    fetch(`${globalConfig.restAPI}/application/register`, requestOptions)
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          alert((data && data.message) || response.status)
          setSubmitFormState(false);
        } else {
          alert((data && data.message) || response.status)
          currentTarget.reset()
          setFileName("")
          setSubmitFormState(false);
        }

      })
      .catch(error => {
        console.error('There was a network error!', error);
        setSubmitFormState(false);
      });

  }

  function showCountryList(e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.parentElement!.nextElementSibling!.classList.add('show')
  }

  function hideCountryList(e: React.FocusEvent<HTMLInputElement>) {
    if (!countryList.includes(e.currentTarget.value)) {
      setCountries(countryList)
      e.currentTarget.value = ""
    }
    e.currentTarget.parentElement!.nextElementSibling!.classList.remove('show')
  }

  function onCountrySelected(inElem: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let target = event.target as HTMLElement
    if (target && !target.classList.contains("dropdown-menu")) {
      if (inElem) {
        let t = document.getElementById(inElem) as HTMLInputElement
        t.value = target.textContent!.trim()
      }
      event.currentTarget.classList.remove('show')
    }
  }

  function uploadResume(event: React.ChangeEvent<HTMLInputElement>) {
    let files = fileRef!.files
    if (!(files && isValidFile(files[0]))) {
      fileRef!.value = ''
      setFileName("")
    } else {
      setFileName(files[0].name)
    }
  }

  async function fetchCountryList() {
    const res = await fetch("country-list.json");
    res
      .json()
      .then(res => {
        countryList = res
        setCountries(countryList)
      })
      .catch(err => null);
  }

  function filterCountries(term: string) {
    if (!term.trim()) {
      return of(countryList);
    }
    return of(countryList.filter((str) => str.toLowerCase().includes(term)));
  }

  let [searchTermsC] = useState(new Subject<string>())

  function searchCountry(e: React.FormEvent<HTMLInputElement>) {
    searchTermsC.next(e.currentTarget.value)
  }

  useEffect(() => {
    fetchCountryList();

    let subs = searchTermsC.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => filterCountries(term))
    ).subscribe((countries) => setCountries(countries))

    return () => {
      subs.unsubscribe();
    }
  }, [])

  return (
    <div className="PostApplication">
      <form className="mt-4 p-4 px-sm-5 py-5 rounded-sm" onSubmit={onSubmit}>
        <h3 className="font-weight-normal mb-5 text-center">Post Application</h3>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input autoComplete="off" type="text"
            className="form-control py-4 rounded-15 text-body w-100"
            id="name"
            placeholder="full name"
            required
            ref={input => nameRef = input}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input autoComplete="off" type="email"
            className="form-control py-4 rounded-15 text-body w-100"
            id="email"
            placeholder="abcd@xyz.com"
            required
            ref={input => emailRef = input}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <div className="dropdown cstm-dropdown form-control" style={{ height: "50px" }}>
            <div className="dropdown-toggle">
              <input
                required
                onClick={showCountryList} onBlur={hideCountryList} onFocus={showCountryList}
                autoComplete="off"
                style={{ outline: 'none' }}
                type="text" id="country"
                className="border-0 w-100"
                placeholder="Country"
                onInput={searchCountry}
                ref={input => countryRef = input}
              />
            </div>
            <div style={{ width: "100%" }} className="border dropdown-menu font-18 shadow text-body" onClick={onCountrySelected.bind(this, 'country')} onMouseDown={(e) => e.preventDefault()}>
              {countries.map((country, i) => <span key={i} className="dropdown-item item-sm">{country}</span>)}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Resume</label>
          <div className="hidden-input-cont d-flex align-items-center">
            <input style={{ left: "4rem" }} required ref={input => fileRef = input} className="hidden-input-target" autoComplete="off" type="file" onChange={uploadResume} id="file-input" />
            <button type="button"
              className="align-items-center btn btn-light btn-primary d-flex" onClick={() => fileRef!.click()}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "1.1rem", height: "1.1rem" }}
                viewBox="0 0 31 31">
                <g id="Icon_feather-upload" data-name="Icon feather-upload"
                  transform="translate(-2.5 -2.5)">
                  <path id="Path_1749" data-name="Path 1749"
                    d="M31.5,22.5v6a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3v-6" fill="none"
                    stroke="#4b4e52" strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="4" />
                  <path id="Path_1750" data-name="Path 1750" d="M25.5,12,18,4.5,10.5,12"
                    fill="none" stroke="#4b4e52" strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth="4" />
                  <path id="Path_1751" data-name="Path 1751" d="M18,4.5v18" fill="none"
                    stroke="#4b4e52" strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="4" />
                </g>
              </svg>
              <span className="pl-2">Upload</span>
            </button>
            <div className="file-name">
              <span>{fileName}</span>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center pt-4">
          <button disabled={submitFormState} id="submitBtn" name="submitBtn" type="submit" className="btn btn-primary">
            Submit Application
        </button>
        </div>
      </form>
    </div>
  );
}

export default PostApplication;
