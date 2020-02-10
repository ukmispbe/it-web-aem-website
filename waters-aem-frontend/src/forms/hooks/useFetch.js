const useFetch = (url, config) => {
    // const [response, setResponse] = useState(null);
    // const [error, setError] = useState(null);
    
    
      const fetchData = async () => {
        try {
            const res = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
          const json = await res.json();
          console.log(json);
          console.log(json.response);
          
          const tempArray = json.map((item) => {
              let tempOption = {};
              tempOption.name = item.soldTo;
              tempOption.label = item.company;
              tempOption.accountStreet = item.partnerAddress[0].street;
              tempOption.accountCity = item.partnerAddress[0].city;
              tempOption.accountZip = item.partnerAddress[0].postalCd;
              return tempOption;
          });
  
          const radioField = config.fields.filter(
              field => field.type === 'radio'
          )[0];
          radioField.options = tempArray;
        console.log("confg", config);

          //setResponse(json);
        } catch (error) {
          //setError(error);
        }
      };
      fetchData();
    return  {config};
  };
  export default useFetch;