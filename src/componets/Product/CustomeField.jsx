import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const CustomeField = ({ fieldObj, setCustomeObjData, customeObjData }) => {
  const onChangeFunc = (e, arr) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "size") {
      if (arr.includes(value)) {
        arr.splice(arr.indexOf(value), 1);
        setCustomeObjData({ ...customeObjData, [name]: [...arr] });
      } else {
        // setIsChecked([...isChecked, value]);
        arr.push(value);
        setCustomeObjData({ ...customeObjData, [name]: [...arr] });
      }
    } else {
      setCustomeObjData({ ...customeObjData, [name]: value });
    }
  };
  if (fieldObj) {
    return fieldObj.map((item, i) => {
      return (
        <>
          {item.type == "dropdown" && !item.addinvarient ? (
            <div className="mb-3 col-md-6 " key={i}>
              <label className="form-label">{item.title}</label>
              <span>{item.info}</span>
              <Dropdown autoClose="outside">
                <Dropdown.Toggle
                  bsPrefix="1"
                  className="btn-light w-100 text-start"
                >
                  Select Size
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100">
                  {item.option.map((option, i) => {
                    return (
                      <div key={i}>
                        {/* <Dropdown.Item key={i}> */}
                        <div className="form-check ms-4 mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={option}
                            name={item.name}
                            // checked={customeObjData[item.name].includes(option)}
                            id={item.name + i}
                            onChange={(e) => {
                              onChangeFunc(e, customeObjData[item.name]);
                            }}
                          />
                          <label
                            className="form-check-label text-capitalize"
                            htmlFor={item.name + i}
                          >
                            {option}
                          </label>
                        </div>
                        {/* </Dropdown.Item> */}
                      </div>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : item.type == "radio" ? (
            <div className="mb-3 col-md-6 " key={i}>
              <label className="form-label" id="productSKU">
                {item.title}
              </label>
              <span>{item.info}</span>
              <br />

              {item.option.map((item1, i) => {
                return (
                  <div className="form-check form-check-inline" key={i}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={item.name}
                      value={item1}
                      id={`radio${i}`}
                      onChange={(e) => {
                        onChangeFunc(e, customeObjData[item.name]);
                      }}
                    />
                    <label
                      className="form-check-label text-capitalize"
                      htmlFor={`radio${i}`}
                    >
                      {item1}
                    </label>
                  </div>
                );
              })}
            </div>
          ) : item.type == "input" ? (
            <div className="mb-3 col-md-6 " key={i}>
              <label className="form-label">{item.title}</label>
              <span>{item.info}</span>
              <input
                type="text"
                className="form-control"
                placeholder={`Enter Product ${item.title}`}
                name={item.name}
                value={customeObjData[item.name]}
                onChange={(e) => {
                  onChangeFunc(e, customeObjData[item.name]);
                }}
              />
            </div>
          ) : item.type == "select" ? (
            <>
              <div className="mb-3 col-md-6">
                <label className="form-label">{item.title}</label>
                <span>{item.info}</span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name={item.name}
                  onChange={(e) => {
                    onChangeFunc(e, customeObjData[item.name]);
                  }}
                >
                  <option selected="">Select {item.title}</option>
                  {item.option.map((option, i) => {
                    return (
                      <option key={i} selected="">
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      );
    });
  }
};

export default CustomeField;
