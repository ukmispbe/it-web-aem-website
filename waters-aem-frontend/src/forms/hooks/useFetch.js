const useFetch = (url, config) => {
  let radioField = {};
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
          
          const tempArray = json.map((item) => {
              let tempOption = {};
              tempOption.name = item.soldTo;
              tempOption.label = item.company;
              tempOption.accountStreet = item.partnerAddress[0].street;
              tempOption.accountCity = item.partnerAddress[0].city;
              tempOption.accountZip = item.partnerAddress[0].postalCd;
              return tempOption;
          });

          radioField = config.fields.filter(
              field => field.type === 'radio'
          )[0];
          
          radioField.options = tempArray;
          console.log("config", config);
          console.log("radioField", radioField);

          //setResponse(json);
        } catch (error) {
          //setError(error);
        }
      };
      fetchData();
    return radioField;
  };
  export default useFetch;