import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { editPost, getPostAdminLimit } from '../../redux/actions/postActions';
import ButtonFrom from '../InputForm/ButtonFrom';
import UpdatePost from '../UpdatePost/UpdatePost';
import { deletePost } from '../../service/Post/post';
import Swal from 'sweetalert2';
import { checkDateTime } from '../../utils/checkExpireTime';

const Omit = ({ table, postTable }) => {
  const [updateData, setUpdateData] = useState([]); // To trigger re-render
  const [isEdit, setIsEdit] = useState(false);
  const dataEdit = useSelector(state => state.post.postEdit);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataEdit) dispatch(getPostAdminLimit());
  }, [dataEdit, updateData, dispatch]);

  useEffect(() => {
    if (!dataEdit) setIsEdit(false);
  }, [dataEdit]);

  const handleDeletePost = async (postId) => {
    console.log(postId);
    const response = await deletePost(postId);
    if (response?.err === 0) {
      setUpdateData(prev => !prev); // Trigger re-fetch of data
    } else {
      Swal.fire('Oops!', 'Có lỗi', 'error');
    }
  };

  const customStyles = {
    headCells: {
      style: {
        fontSize: '15px',
        fontWeight: '700',
        padding: '10px', // Add padding for column headers
      },
    },
    cells: {
      style: {
        padding: '10px', // Add padding for cell content
      },
    },
  };

  const columns = [
    {
      name: 'Mã tin',
      selector: row => row?.overviews?.code,
      sortable: true,
    },
    {
      name: 'Ảnh đại diện',
      selector: row => row?.images?.image,
      cell: row => (
        <img
          src={JSON.parse(row?.images?.image)[0] || ""}
          className="w-[25%] h-[50px] object-cover"
          alt="Post thumbnail"
        />
      ),
      sortable: true,
    },
    {
      name: 'Tiêu đề',
      selector: row => row?.title?.slice(0, 20),
      sortable: true,
    },
    {
      name: 'Giá',
      selector: row => row?.attributes?.price,
      sortable: true,
    },
    {
      name: 'Ngày tạo tin',
      selector: row => row?.overviews?.created,
      sortable: true,
    },
    {
      name: 'Ngày hết hạn',
      selector: row => row?.overviews?.expired,
      sortable: true,
    },
    {
      name: 'Trạng thái',
      selector: row => row?.overviews?.expired?.split(',')[2],
      cell: row => (
        <span>
          {checkDateTime(row?.overviews?.expired?.split(',')[2]) ? 'Đang hoạt động' : 'Đã hết hạn'}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Tuỳ chọn',
      cell: row => (
        <div className="flex space-x-2">
          <ButtonFrom
            manage="manage"
            text="Sửa"
            px="px-2"
            bgColor="bg-primary"
            textColor="text-white"
            magrin="me-2"
            onClick={() => {
              dispatch(editPost(row));
              setIsEdit(true);
            }}
          />
          <ButtonFrom
            manage="manage"
            text="Xoá"
            px="px-2"
            textColor="text-white"
            bgColor="bg-danger"
            onClick={() => handleDeletePost(row.id)}
          />
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={postTable}
        pagination
        customStyles={customStyles}
      />
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </>
  );
};

export default Omit;
