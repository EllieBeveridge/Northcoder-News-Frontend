import React from 'react';

const Dropdown = (props) => {

  return (
    <div>
      <select id="sorting" onselect={e => props.handleDropdown(e)}>
        <option name="by-vote" value="by-vote">Top Voted</option>
        <option name="most-recent" value="most-recent">Most Recent</option>
      </select>
    </div>
  );
}


export default Dropdown;