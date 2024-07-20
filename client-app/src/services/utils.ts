import axios from "axios";

// const API_URL = "http://localhost:8000/api";
const API_URL = process.env.REACT_APP_BASE_URL;

export async function postData(body: string, url: string, token?: string) {
    try {
        var myHeaders: any = {};
        myHeaders["Content-Type"] = "application/json";
        myHeaders["Accept"] = "application/json";
        myHeaders["Access-Control-Allow-Origin"] = "*";
        if (token) myHeaders["authorization"] = `Bearer ${token}`;

        var requestOptions = {
            headers: myHeaders
        };

        const response = await axios.post(API_URL + url, body, requestOptions);
        return response;
    } catch (error: any) {
        console.log("error", error);
        return error;
    }
}

export async function putData(body: string, url: string, token?: string) {
    try {
        var myHeaders: any = {};
        myHeaders["Content-Type"] = "application/json";
        myHeaders["Accept"] = "application/json";

        if (token) myHeaders["authorization"] = `Bearer ${token}`;

        
        var requestOptions = {
            headers: myHeaders
        };

        const response = await axios.put(API_URL + url, body, requestOptions);
        return response;

    } catch (error: any) {
        console.log("error", error.response);
        return error;
    }
}

export async function getData(url: string, token?: string) {
    try {
        var myHeaders: any = {};
        myHeaders["Accept"] = "application/json";
        myHeaders["Access-Control-Allow-Origin"] = "*";
        if (token) myHeaders["Authorization"] = `Bearer ${token}`;

        var requestOptions = {
            headers: myHeaders
        };

        const response = await axios.get(API_URL + url, requestOptions);
        return response;
        
    } catch (error: any) {
        console.log("error", error);
        return error;
    }
}

export async function deleteData(url: string, body?: any, token?: string) {
    try {
        var myHeaders: any = {};
        myHeaders["Accept"] = "application/json";
        myHeaders["Access-Control-Allow-Origin"] = "*";
        if (token) myHeaders["Authorization"] = `Bearer ${token}`;

        const requestOptions = {
            headers: myHeaders,
            data: body 
        };

        const response = await axios.delete(API_URL + url, requestOptions);
        return response;

    } catch (error: any) {
        console.error("Error on delete request:", error.response || error.message || error);
        throw error; 
    }
}

interface DateTimeFormatOptions extends Intl.DateTimeFormatOptions {
    timeZone?: string;
  }
  
  export function formatDateTime(dateTime: string, options: DateTimeFormatOptions = {}): string {
    const defaultOptions: DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: undefined,
      timeZoneName: 'short',
      hour12: true
    };
  
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', { ...defaultOptions, ...options });
  }
  
  export default formatDateTime;
