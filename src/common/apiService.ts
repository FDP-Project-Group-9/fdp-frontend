import axios from 'axios';

import { UniversalObjectType } from './Types';

const dataSource = process.env.REACT_APP_MONGO_DATA_SOURCE || 'MyDataBase';
const DB_Name = process.env.REACT_APP_MONGO_DB_NAME || 'fdp';
const secretKey = process.env.REACT_APP_MONGODB_API_KEY;
const dataApiURL = process.env.REACT_APP_MONGO_DB_DATA_API_URL;
            
const makeRequest = (url: string, data: UniversalObjectType, additionalConfig?: UniversalObjectType) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': secretKey,
          }, 
          ...additionalConfig
    };
    
    try{
        return axios.post(url, data, config);
    }
    catch(err){
        return err;
    }

};

export const fetch = (collectionName: string, body: UniversalObjectType, requestType: string) => {
    const data: UniversalObjectType = {
        "collection": collectionName,
        "database": DB_Name,
        "dataSource": dataSource,
    };

    let url:string = dataApiURL || "";
    
    switch(requestType){
        case "insert":  data["document"] = body;    
                        url += "insertOne";
                        break;
        case "findOne": data["filter"] = body;
                        url += "findOne";
                        break;
        case "delete":  data["filter"] = body;
                        url += "deleteOne";
                        break;
        case "updateOne": data["filter"] = body;
                          url += "updateOne";
                          break;
        case "findAll": url += "find";
                        break;
        default: console.error("Provide a valid request type for api call");
    };
    
    return makeRequest(url, data);
};
        