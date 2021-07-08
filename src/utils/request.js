import axios from 'axios';

const instance = axios.create({
    baseURL:"http://localhost:3000",
        // "https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd",
    withCredentials:true,    
    timeout: 10000
});

export const get = (url, params={}) => {
    return instance.get(url,params)
        .then(res => {
            // resolve(response.data)
            return res.data;
        })
        .catch(err => {
            console.log(err)

            // reject(err);
        });
};

export const post=(url,data={})=>{
    return  instance.post(url,data,{            
            header:{'content-type':'application/json'}
        }).then(response=>{             
            // resolve(response.data)
            return response.data
        }).catch(err=>{
            console.log(err)
        })
 }

 export const patch=(url,data={})=>{
    return  instance.patch(url,data,{            
            header:{'content-type':'application/json'}
        }).then(response=>{             
            // resolve(response.data)
            return response.data
        }).catch(err=>{
            reject(err)
        })
 }