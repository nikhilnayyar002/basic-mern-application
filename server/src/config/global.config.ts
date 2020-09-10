export interface processEnvironment {
  isProduction: boolean;
  port: number;
  mongoURI: string;
}

export interface globalEnvironment {
  /** all rest api requests will have base as restAPI eg: "/api"
   *  Eg: http://localhost:3000/api/method
   */
  restAPI: string;
  server: {
    dev: processEnvironment;
    prod: processEnvironment;
  };
  resume: {
    resumeUploads: string;
    resumeUploadSize: number;
    resumeRequestUrl: string;
    resumeFormDataName: string;
    files: { [prop: string]: string };
  }
}

/**
 * message response from server
 */
export interface BackendStatus {
  status: boolean;
  message: string;
}


/** Typescript Modal  */
export interface Application {
  name: string;
  email: string;
  country: string;
  resume: string;
  date: string;
}