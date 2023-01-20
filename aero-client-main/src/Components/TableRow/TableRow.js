import React from 'react';

const TableRow = (seller) => {
  const { seller: user, idx, handleDeleteSeller, handelVerifySeller } = seller;

  // console.log(seller);

  return (
    <>
      <tr>
        <th>{idx + 1}</th>
        <td>{user?.name}</td>
        <td>{user?.email}</td>
        <td>
          {
            user?.verified ? <>
              <span className='text-white bg-green-700 px-3 py-[2px] rounded-md font-semibold'>Verified</span>
            </>
              :
              <button
                onClick={() => handelVerifySeller(user?._id, user?.email)}
                className='btn btn-xs btn-success text-sm font-medium'
              > Verify </button>
          }
        </td>
        <td>
          <button
            onClick={() => handleDeleteSeller(user?._id)}
            className='btn btn-xs btn-error text-sm font-medium'
          >Delete</button>
        </td>
      </tr>
    </>
  );
};

export default TableRow;