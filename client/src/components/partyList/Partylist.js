import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Select, Button } from 'antd';
import Partydetail from '../partyDetail/Partydetail';

function Partylist() {
  const [partyName, setpartyName] = useState();

  const { Option } = Select;

  const [partyObject, setpartyObject] = useState();
  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/as2020/listofparties')
      .then(res => {
        console.log(res.data);
        setpartyName(res.data);
      })
      .catch(err => {
        console.error(err);
      })

  }, []);

  function onChange(value) {
    // console.log(`selected ${value}`);
    setpartyObject(partyName[value]._id)
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <div>
      <div>

        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {
            partyName && partyName.map((party, index) => (
              <Option value={index}>{party._id.partyName} {party._id.brokerName}</Option>
            ))
          }
        </Select>
      </div>
      <div>
        <Partydetail partyObject={partyObject} />
      </div>
    </div>
  )
}

export default Partylist;
