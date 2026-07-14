import {useState, useEffect} from "react";

export default function useFetch({link}){
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch(link)
    .then((response) => response.json())
    .then((response) => setData(response))
  }, [link])

  return data
}