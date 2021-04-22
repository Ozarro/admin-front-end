import React from "react";

export default function CustomTextField(props) {
  return (
    <div className="flex items-center">
      <div>
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
          <i className={props.iconName}></i>
        </span>
      </div>
      <div>
        <h4 className="text-gray-600">{props.message}</h4>
      </div>
    </div>
  );
}
