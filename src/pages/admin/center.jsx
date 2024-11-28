import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/data-table";
import { useRef, useState } from "react";
import queryString from "query-string";
import { fetchCenter } from "../../redux/slice/centerSlice";
import { sfLike } from "spring-filter-query-builder";
import { Button, message, notification, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ModalCenter from "../../components/modal/modal.center";
import { callDeleteCenter } from "../../config/api";

const CenterPage = () => {
  const tableRef = useRef();

  const reloadTable = () => {
    tableRef?.current?.reload();
  };

  const [dataInit, setDataInit] = useState(null);

  const isFetching = useSelector((state) => state.center.isFetching);
  const meta = useSelector((state) => state.center.meta);
  const centers = useSelector((state) => state.center.result);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const handleDeleteCompany = async (id) => {
    console.log(id)
    if (id) {
      const res = await callDeleteCenter(id);
      if (res && +res.statusCode === 200) {
        message.success("Xóa Trung tâm thành công");
        reloadTable();
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 50,
      align: "center",
      render: (text, record, index) => {
        return <>{index + 1 + (meta.page - 1) * meta.pageSize}</>;
      },
      hideInSearch: true,
    },
    {
      title: "Image",
      dataIndex: "image",
      hideInSearch: true,
      render: (text) => (
        <img
          src={"http://localhost:8080/storage/center/" + text}
          alt="center"
          style={{
            width: "50px",
            height: "auto",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      hideInSearch: true,
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      hideInSearch: true,
      sorter: true,
    },
    {
      title: "Working",
      hideInSearch: true,
      dataIndex: "workingHours",
    },
    {
      title: "Actions",
      hideInSearch: true,
      width: 50,
      render: (_value, entity) => (
        <Space>
          <EditOutlined
            style={{
              fontSize: 20,
              color: "#ffa500",
            }}
            onClick={() => {
              setOpenModal(true);
              setDataInit(entity);
            }}
          />

          <Popconfirm
            placement="leftTop"
            title={"Xác nhận xóa company"}
            description={"Bạn có chắc chắn muốn xóa company này ?"}
            onConfirm={() => handleDeleteCompany(entity.centerId)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <span style={{ cursor: "pointer", margin: "0 10px" }}>
              <DeleteOutlined
                style={{
                  fontSize: 20,
                  color: "#ff4d4f",
                }}
              />
            </span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const buildQuery = (params, sort) => {
    const clone = { ...params };
    const q = {
      page: params.current,
      size: params.pageSize,
      filter: "",
    };

    if (clone.name) q.filter = `${sfLike("name", clone.name)}`;
    if (clone.address) {
      q.filter = clone.name
        ? q.filter + " and " + `${sfLike("address", clone.address)}`
        : `${sfLike("address", clone.address)}`;
    }

    if (!q.filter) delete q.filter;

    let temp = queryString.stringify(q);

    let sortBy = "";
    if (sort && sort.name) {
      sortBy = sort.name === "ascend" ? "sort=name,asc" : "sort=name,desc";
    }
    if (sort && sort.address) {
      sortBy =
        sort.address === "ascend" ? "sort=address,asc" : "sort=address,desc";
    }
    if (sort && sort.capacity) {
      sortBy =
        sort.capacity === "ascend" ? "sort=capacity,asc" : "sort=capacity,desc";
    }
    temp = `${temp}&${sortBy}`;

    return temp;
  };
  
  return (
    <>
      <DataTable
        actionRef={tableRef}
        headerTitle="Danh sách Trung tâm tiêm chủng"
        rowKey="centerId"
        loading={isFetching}
        columns={columns}
        dataSource={centers}
        request={async (params, sort, filter) => {
          const query = buildQuery(params, sort, filter);
          dispatch(fetchCenter({ query }));
        }}
        scroll={{ x: true }}
        pagination={{
          current: meta.page,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        rowSelection={false}
        toolBarRender={() => {
          return (
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setOpenModal(true)}
            >
              Thêm mới
            </Button>
          );
        }}
      />
      <ModalCenter
        openModal={openModal}
        setOpenModal={setOpenModal}
        reloadTable={reloadTable}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </>
  );
};
export default CenterPage;
